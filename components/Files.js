const Files = ({ folders, files }) => {
  return (
    <div>
      <b>Folders</b>
      {folders.map((item, key) => (
        <div key={key}>{item?.name}</div>
      ))}
      <b>Files</b>
      {files.map((item, key) => (
        <div key={key}>{item?.name}</div>
      ))}
    </div>
  );
};
export default Files;
