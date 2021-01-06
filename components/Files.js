const Files = ({ folders = [], files = [], onGetFiles }) => {
  const hasFolders = folders.length > 0;
  const hasFiles = files.length > 0;
  return (
    <div>
      <h2>Here you can get files from firebase, please click button</h2>
      <button onClick={onGetFiles}>Get files</button>
      <br />
      {hasFolders && <b>Folders</b>}
      {hasFolders &&
        folders.map((item, key) => (
          <div key={key}>
            🗂{` `}
            {item?.name}
          </div>
        ))}
      {hasFiles && <b>Files</b>}
      {hasFiles &&
        files.map((item, key) => (
          <div key={key}>
            📈{` `}
            {item?.name}
          </div>
        ))}
    </div>
  );
};
export default Files;
