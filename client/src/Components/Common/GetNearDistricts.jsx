const districtDistanceMap = [
  ["Thiruvananthapuram", 0],
  ["Kollam", 40],
  ["Pathanamthitta", 70],
  ["Alappuzha", 100],
  ["Kottayam", 120],
  ["Idukki", 170],
  ["Ernakulam", 200],
  ["Thrissur", 250],
  ["Palakkad", 300],
  ["Malappuram", 350],
  ["Kozhikkode", 400],
  ["Wayanad", 450],
  ["Kannur", 500],
  ["Kasargode", 550],
];

function getNearDistricts(districtName) {
    console.log("The getNearDist has been called at "+districtName);
  const districtEntry = districtDistanceMap.find(
    (entry) => entry[0] === districtName
  );
  const dist = districtEntry[1];

  const districtsWithDiff = districtDistanceMap.map(([district, distance]) => ({
    district,
    difference: Math.abs(dist - distance),
  }));

  // Sort the array based on the absolute difference in ascending order
  districtsWithDiff.sort((a, b) => a.difference - b.difference);

  // Extract only the district names from the sorted array
  const sortedDistricts = districtsWithDiff.map((item) => item.district);
  console.log(sortedDistricts);
  if(sortedDistricts){
    return sortedDistricts
  }
  else{
    return []
  }
}


export default getNearDistricts;