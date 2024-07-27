import { Loader, LoaderOptions } from '@googlemaps/js-api-loader';
import * as dotenv from 'dotenv';

dotenv.config();
const mapKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY

const apiOptions: LoaderOptions = {
  apiKey: mapKey as string,
  libraries: ['places'],
};

const loader = new Loader(apiOptions);

export default loader;