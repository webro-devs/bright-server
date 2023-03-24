import { RequestHandler } from "express";
import { plainToClass } from "class-transformer";
import { validate, ValidationError } from "class-validator";
import { sanitize } from "class-sanitizer";
import { HttpException } from ".";

function DtoValidationMiddleware(
  type: any,
  skipMissingProperties = false,
): RequestHandler {
  return (req, res, next) => {
    const dtoObj = plainToClass(type, req.body);
    validate(dtoObj, { skipMissingProperties }).then(
      (errors: ValidationError[]) => {
        if (errors.length > 0) {
          const dtoErrors = errors
            .map((error: ValidationError) =>
              (Object as any).values(error.constraints),
            )
            .join(",\n ");

          res.status(400).send(new HttpException(true, 400, dtoErrors));
          return;
        } else {
          sanitize(dtoObj);
          req.body = dtoObj;
          next();
        }
      },
    );
  };
}

export default DtoValidationMiddleware;
