/* eslint-disable react/prop-types */
export default function ArtistView({ artistImageUrl, artistName, artistType }) {
  let type = artistType.charAt(0).toUpperCase() + artistType.slice(1);
  return (
    <li>
      <img
        src={artistImageUrl}
        alt="artistImage"
        className="rounded-full w-[10rem] h-[10rem] object-center object-cover "
      />
      <div className="text-white flex flex-col items-start font-medium mt-2 ml-2">
        <p>{artistName}</p>
        <p className="text-[#919191]">{type}</p>
      </div>
    </li>
  );
}
