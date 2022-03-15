import axios from "axios";

export const getBlock = async (identifier = "") => {
  const url = `${process.env.HOST_API}/api/v1/blocks/?identifier=${identifier}`;

  try {
    const { data } = await axios.get(url);
    return data;
  } catch (err) {
    console.log("data block err:", err);
  }

  return {};
};

export const getBlockWithChecks = async (identifier = "") => {
  const url = `${process.env.HOST_API}/api/v1/blocks/?identifier=${identifier}`;
  const result = await axios.get(url);

  if (result.data?.data === null) {
    return "";
  }

  return result.data.data.items.content;
};

export const getBlockAsync = async (identifier = "") => {
  const url = `${process.env.HOST_API}/api/v1/blocks/?identifier=${identifier}`;
  return axios.get(url);
};

export const getBlocks = async (identifiers = []) => {
  const blockResponses = await axios.all(identifiers.map(getBlockAsync));

  return blockResponses.map(blockData => blockData.data.data.items.content);
};

export const getBlocksWithChecks = async (identifiers = []) => {
  const blockResponses = await axios.all(identifiers.map(getBlockWithChecks));

  return blockResponses.map(blockData => blockData);
};
