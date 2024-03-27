export const formatNumber = (price:string) => {
  const numericPrice = Number(price);
  return new Intl.NumberFormat('ko-KR').format(numericPrice) + ' 원'
}

export const formattedAuthors = (author:string) => {
  return author.split('^').join(', ');
}

export const formatPubDate = (pubdate:string): string => {
  const year = pubdate.slice(0, 4);
  const month = pubdate.slice(4,6);
  const day = pubdate.slice(6, 8);
  return `${year}.${month}.${day}`;
}