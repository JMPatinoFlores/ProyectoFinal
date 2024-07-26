// import Image from 'next/image';

// function HotelDetail() {
//   return (
    
//     <div className="flex flex-wrap">
//       <div className="w-1/2">
//         <div className="mb-4">
//           <h2 className="text-lg font-bold">Descripción</h2>
//           <p>
//             Lorem ipsum dolor sit amet consectetur adipiscing elit inceptos, volutpat sem lobortis sed platea interdum suspendisse, varius eget eu fringilla auctor urna bibendum. Mus diam enim ullamcorper litora ultrices neque senectus risus blandit habitasse, ac luctus natoque himenaeos massa scelerisque libero nascetur vestibulum primis vulputate, class parturient curae torquent lobortis sollicitudin augue nunc bibendum.
//           </p>
//         </div>
//         <div className="mb-4">
//           <h2 className="text-lg font-bold">Servicios del Hotel</h2>
//           <ul>
//             <li>Buffette</li>
//             <li>Bar</li>
//             <li>Restaurante</li>
//             <li>Eventos</li>
//           </ul>
//         </div>
//         <div className="mb-4">
//           <h2 className="text-lg font-bold">Precio</h2>
//           <p>
//             <span className="text-red-600 font-bold">100</span> USD/noche
//           </p>
//         </div>
//         <div className="mb-4">
//           <h2 className="text-lg font-bold">Recomendaciones</h2>
//           <ul>
//             <li>Discotecas</li>
//             <li>Restaurantes</li>
//             <li>Cines</li>
//           </ul>
//         </div>
//       </div>
//       <div className="w-1/2">
//         <div className="relative w-full h-64 mb-4">
//           <Image
//             src="/francesca-saraco-_dS27XGgRyQ-unsplash.jpg"
//             alt="Hotel Image"
//             layout="fill"
//             objectFit="cover"
//           />
//         </div>
//         <div className="relative w-full h-32 mb-4">
//         <Image
//             src="/googleMaps.png"
//             alt="Map image"
//             layout="fill"
//             objectFit="cover"
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default HotelDetail;



import Image from 'next/image';

function HotelDetail() {
  return (
    <div className="flex flex-wrap">
      <div className="w-1/2">
        <div className="relative w-full h-64 mb-4">
          <Image
            src="/francesca-saraco-_dS27XGgRyQ-unsplash.jpg"
            alt="Hotel Image"
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="relative w-full h-32 mb-4">
             <Image
             src="/googleMaps.png"
             alt="Map image"
             layout="fill"
             objectFit="cover"
           />
        </div>
      </div>
      <div className="w-1/2">
        <div className="mb-4">
          <h2 className="text-lg font-bold">Descripción</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipiscing elit inceptos, volutpat sem lobortis sed platea interdum suspendisse, varius eget eu fringilla auctor urna bibendum. Mus diam enim ullamcorper litora ultrices neque senectus risus blandit habitasse, ac luctus natoque himenaeos massa scelerisque libero nascetur vestibulum primis vulputate, class parturient curae torquent lobortis sollicitudin augue nunc bibendum.
          </p>
        </div>
        <div className="mb-4">
          <h2 className="text-lg font-bold">Servicios del Hotel</h2>
          <ul>
            <li>Buffette</li>
            <li>Bar</li>
            <li>Restaurante</li>
            <li>Eventos</li>
          </ul>
        </div>
        <div className="mb-4">
          <h2 className="text-lg font-bold">Precio</h2>
          <p>
            <span className="text-red-600 font-bold">100</span> USD/noche
          </p>
        </div>
        <div className="mb-4">
          <h2 className="text-lg font-bold">Recomendaciones</h2>
          <ul>
            <li>Discotecas</li>
            <li>Restaurantes</li>
            <li>Cines</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default HotelDetail;
