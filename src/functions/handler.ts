import { Handler } from "aws-lambda";
import "source-map-support/register";

export const version: Handler = async (event, _context) => {
  return {
    version: "0.0.1",
  };
};
