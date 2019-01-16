import { NextFunction, Request, Response } from "express";
import * as t from "io-ts";
// import * as express from "express";

const Query = t.exact(
  t.interface({
    name: t.string,
  }),
);

type IQuery = t.TypeOf<typeof Query>;

interface SanatizedRequest extends Request {
  dangerouslyUnsafeQuery: any;
  safeQuery: IQuery;
}

// function decodeToPromise<T, O, I>(
//   validator: t.Type<T, O, I>,
//   input: I,
// ): Promise<T> {
//   const result = validator.decode(input);
//   return result.fold(
//     () => Promise.reject(new Error("Bad request")),
//     (value) => Promise.resolve(value),
//   );
// };

export const sanatize = (
  req: SanatizedRequest,
  res: Response,
  next: NextFunction,
) => {
  const safeQuery = Query.decode(req.query);

  if (safeQuery.isLeft()) {
    next(new Error("Bad query params"));
    return;
  }
  req.safeQuery = safeQuery.value;
  req.dangerouslyUnsafeQuery = req.query;
  req.query = null;

  next();
};

export const service = (req: SanatizedRequest, res: Response) => {
  res.status(200).send(`Hello ${req.safeQuery.name || "World"}`);
};

const controller: any[] = [sanatize, service];
export default controller;
