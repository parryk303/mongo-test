export default (b64Data, fileName = 'file', type, size) => {
  let contentType = type;
  let sliceSize = size;
  contentType = contentType || 'zip';
  sliceSize = sliceSize || 512;
  const byteCharacters = atob(b64Data);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i += 1) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);

    byteArrays.push(byteArray);
  }

  const blob = new Blob(byteArrays, { type: `application/${contentType}` });

  if (window.navigator && window.navigator.msSaveOrOpenBlob) {
    // IE workaround
    window.navigator.msSaveOrOpenBlob(blob, `${fileName}.${contentType}`);
  } else {
    // other browers,  IE is easier in this case
    const url = URL.createObjectURL(blob);
    const dummyLink = document.createElement('a');
    dummyLink.href = url;
    dummyLink.download = `${fileName}.${contentType}`;
    document.body.appendChild(dummyLink);
    dummyLink.click();
  }
};
