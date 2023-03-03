import { CreateTodoDTO } from "../dtos/CreateTodoDTO";
import { isDate, isStringEmpty } from "../util";

class Validations {
  private _validatedResult: { propertyName: string; error: string }[] = [];

  public validateCreateTodo = (createTodoDto: CreateTodoDTO) => {
    const isDescriptionEmpty = isStringEmpty(createTodoDto.description);

    const isDateValid = isDate(createTodoDto.targetDate);

    if (!isDescriptionEmpty) {
      this._validatedResult.push({
        propertyName: "description",
        error: "Description cannot be empty",
      });
    }

    if (!isDateValid) {
      this._validatedResult.push({
        propertyName: "description",
        error: "Description cannot be empty",
      });
    }

    const copiedResult = [...this._validatedResult];
    this._validatedResult = [];

    return copiedResult;
  };
}

const obj = new Validations();

export default obj;
