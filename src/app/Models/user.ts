import { Deserializable } from '../Models/deserializable';
export class user implements Deserializable {
    id?: number;
    is_active: boolean = false;
    question: string = '';
    answer: string = '';
    created_at?: string;
    updated_at?: string;
  
    deserialize(input: any): this {
      if (input) {
        Object.assign(this, input);
      }
      return this;
    }
  
    toOdata(): Object {
      return {
        ...this,
        created_at: undefined,
        updated_at: undefined,
      };
    }
  }
  