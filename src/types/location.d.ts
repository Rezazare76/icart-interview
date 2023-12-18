type LocationComplete = [
  {
    id: string;
    name: string;
    children: [
      {
        id: string;
        name: string;
      }
    ];
  }
];
export default LocationComplete;
