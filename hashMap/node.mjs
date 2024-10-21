export default function Node({ key, value } = {}, nextNode = null) {
  return {
    key,
    value,
    nextNode,
  };
}
