import { Injectable } from '@nestjs/common';
import { containerBootstrap } from '@nlpjs/core';
import { NlpManager } from 'node-nlp';
import { LangEs } from '@nlpjs/lang-es';

@Injectable()
export class NaturalLanguageProcessor {
  private manager: NlpManager;

  constructor() {
    this.manager = new NlpManager({ languages: ['es'], forceNER: true });
    //this.initialize();
  }

  async getEntity(value: string): Promise<any> {
    try {
      console.log('Processing value:', value);
      const entity = await this.manager.process('es', value);

      console.log('Processed entity:', entity);

      if (!entity || !entity.intent) {
        console.error('Entity or entity.intent is undefined:', entity);
        return null;
      }

      // Manejar casos sin entidades pero con intención identificada
      if (
        entity.entities &&
        Array.isArray(entity.entities) &&
        entity.entities.length > 0
      ) {
        if (entity.intent === 'hotel') {
          return { type: 'hotel', name: entity.entities[0].value };
        } else if (entity.intent === 'country') {
          return {
            type: 'country',
            country:
              entity.entities.find((e) => e.entity === 'country')?.value ||
              null,
            city:
              entity.entities.find((e) => e.entity === 'city')?.value || null,
          };
        } else if (entity.intent === 'service') {
          return { type: 'service', service: entity.entities[0].value };
        } else if (entity.intent === 'room') {
          return { type: 'room', room: entity.entities[0].value };
        }
      }

      // Si no hay entidades, manejar la intención directamente
      if (entity.intent === 'hotel') {
        return { type: 'hotel', name: value }; // Usa el valor completo como nombre si no hay entidad extraída
      } else if (entity.intent === 'location') {
        return { type: 'location', country: value }; // Usa el valor completo como país si no hay entidad extraída
      }

      console.error('Unknown intent or empty entities:', entity);
      return null;
    } catch (error) {
      console.error('Error processing entity:', error);
      return null;
    }
  }

  async initialize() {
    console.log('Initializing NLP Processor...');

    this.manager.addNamedEntityText('hotel', ['hotel %name%'], ['hotel']);
    this.manager.addNamedEntityText(
      'pais',
      ['en %country%', '%country%'],
      ['location'],
    );
    this.manager.addNamedEntityText(
      'ciudad',
      ['en %city%', '%city%'],
      ['location'],
    );
    this.manager.addNamedEntityText(
      'service',
      ['hotel con %service%'],
      ['service'],
    );
    this.manager.addNamedEntityText('room', ['habitaciones %room%'], ['room']);

    this.manager.addDocument('es', 'hotel %name%', 'hotel');
    this.manager.addDocument(
      'es',
      'quiero reservar un hotel llamado %name%',
      'hotel',
    );
    this.manager.addDocument('es', 'me interesa el hotel %name%', 'hotel');

    this.manager.addDocument('es', 'quiero un hotel en %city%', 'hotel');
    this.manager.addDocument('es', 'dame un hotel en %city%', 'hotel');
    this.manager.addDocument('es', 'necesito un hotel en %city%', 'hotel');
    this.manager.addDocument('es', 'un hotel en %city%', 'hotel');

    this.manager.addDocument('es', 'un hotel en %country%', 'hotel');
    this.manager.addDocument('es', 'hotel en %country%', 'hotel');
    this.manager.addDocument('es', '%country% %city%', 'location');
    this.manager.addDocument('es', '%country%', 'location');

    this.manager.addDocument('es', 'un hotel con %service%', 'service');
    this.manager.addDocument('es', 'ofrece %service%', 'service');
    this.manager.addDocument('es', '%service%', 'service');

    this.manager.addDocument('es', 'habitaciones %room%', 'room');
    this.manager.addDocument('es', 'tipos de habitaciones %room%', 'room');

    (async () => {
      console.log('Training and saving the model...');
      await this.manager.train();
      await this.manager.save();
      console.log('Model training complete.');

      // Testing with examples
      const testresponse = await this.manager.process('es', 'hotel Mountain');
      console.log(
        'Response after traininggggggggggggggggggggggg:',
        testresponse,
      );
      console.log('current stateeeeeeeeeee: ', this.manager);
    })();
  }
}
