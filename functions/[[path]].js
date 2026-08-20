const ICON_BASE64 = `iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAEsklEQVR42sWXQWgTWRjHf/NmMmYamhZ1trr1UqugZXUjuIoXD3vUQzyYKFhBqELP3vSwQs+ieFmx1HPBntZVFqpdqEhVCrJdhYAXK6gYRNtJ0pnJZGa+PawJdpNqw9L6wWMO7735/9/3f+//3qfZtt0JlIEM8AvwM9DF2oQD/AmMAH8BnZpt2wBZYAJIsD5RA3LAb5pt2z8Cs5/AQ8BYY/A6Rg34SU+lUr8CP6wTOID6hJUAvtNs215cQ82/uifUNwQH6Go75bquo2kaURQhIi37mkQPwxDQgabOtghomobjOIRhSDqdRtd1RARN0xARFhcXiaKoaU4cx0ZnZyeJRKKJtNEOeBAE5PN5tm7dyvj4OOVyGcMwGqDHjx+nt7eXKIoamYjjmGQyyd27d5mfn8c0zWUkVkVAKYXrugwMDHD9+nUsy6JUKjE2NsbmzZvxPI+rV68yNDTUyEgdXClFsVhkfHwcpVTLI7Gq1VerVYaHhzEMg3K5zMmTJ0mlUriuy/bt28nlcjiOw4cPHyiVSpTLZUqlEgBXrlzh1atXbNiwoX0JlFIsLS2RyWQ4duwYvu+jlGL//v0cPHiQe/fu0dHRQRiG6LpOMpnk/PnzFAoFLMsCoFAo0N3dzb97sc0MKKWoVqucO3eO7u5u3r59y/3797Esi1wu19C/nnZN03j+/DkzMzM8efKER48eUavV0HV9RVf66ur37NlDNpsF4Pbt24yMjBAEAUeOHKGvrw/XdZen1TBIJBKYpolhGJRKpabUr0oCpRSe53H27Fls2+b9+/dMTExQKBR4/Pgxhw8f5ujRo0xOTqLrOnEcE4Yhly9fZmlpCaUUuq5z584dbty40XQCALBtW1q1np4eSafTkslk5N27dyIiMjY2Jrqui1JKhoaGRETk4cOH0t/fL8ViUXzfl48fP4rv+xIEQaOJiJw4cUIsy5ItW7Ysw1GrWX1PTw8LCwuMjo6yY8cOMpkML1++5M2bNxw6dIi+vj4uXLiA53kkEgl838fzPCqVCgsLC4gIu3btolarNTml8SXtd+7cSTabRUS4desWrusyMzNDFEUNK46iiDNnzjA4OMjs7CybNm1qSHHt2jV2795dt+OWNm2sdO5rtRoXL15k27ZtiAg3b95kZGSEjRs3No0/deoUo6OjPH36lNevXwNQrVbxPK9hPq3AVyQQRRGWZTE1NcXc3Bzz8/M8e/aMyclJpqenieO4MVZESKVSOI5DpVLBsixEhCAIiON4ReAVCdRtd+/evfT391OpVBgYGODAgQM4jtPyOIkI+Xye06dPN/rjOKa3t5cgCDBNsz0CnucxPDzM4OBgw8/r35VCRJZlRtM0yuUyruuSTqcRkZbkjVabb9++feTz+cZP6xP/e9V+KUSEdDpNV1cXxWKxYdmfk2wiUL/JlFJcunQJ3/e/quFq4sGDB7x48aIlAc22bWl189Wd7P+GiNDR0UEymWwCb7kHRATTNMU0zUjX9f/9StY0jTAM4ziOVTt3gQYY7Wi+iqf4ih3ON3wVOwqY+qxiWa+oY01989JMAXOfCsXaOpVmxmfF6ZyeSqU6gb+B34Ee4HsguYbl+R/AIDANdP4DApdjYfCQd2wAAAAASUVORK5CYII=`;

function iconBytes() {
  const binary = atob(ICON_BASE64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

export function onRequest(context) {
  const path = new URL(context.request.url).pathname;

  if (path === '/favicon-as-final-v2.png' || path === '/favicon.ico') {
    return new Response(iconBytes(), {
      status: 200,
      headers: {
        'Content-Type': 'image/png',
        'Cache-Control': 'no-store, max-age=0',
        'X-Content-Type-Options': 'nosniff'
      }
    });
  }

  return context.next();
}
