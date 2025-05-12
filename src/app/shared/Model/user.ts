import { Deserializable } from '../interfaces/deserializable';

// export class User implements Deserializable {
//   id?: number;
//   name: string = '';
//   email: string = '';
//   phone: string = '';
//   created_at?: string;
//   updated_at?: string;

//   deserialize(input: any): this {
//     if (input) {
//       Object.assign(this, input);
//     }
//     return this;
//   }

//   toOdata(): Object {
//     return {
//       ...this,
//       created_at: undefined,
//       updated_at: undefined,
//     };
//   }
// }
// export class User implements Deserializable {
//   id?: number;
//   first_name: string = '';
//   last_name: string = '';
//   email: string = '';
//   phone: string = '';
//   address: string = '';
//   created_at?: string;
//   updated_at?: string;
//   is_active?: boolean; // Add is_active to match the filter query

//   deserialize(input: any): this {
//     if (!input) {
//       return this;
//     }
//     this.id = input.id ?? this.id;
//     this.first_name = input.first_name ?? this.first_name;
//     this.last_name = input.last_name ?? this.last_name;
//     this.email = input.email ?? this.email;
//     this.phone = input.phone ?? this.phone;
//     this.address = input.address ?? this.address;
//     this.created_at = input.created_at ?? this.created_at;
//     this.updated_at = input.updated_at ?? this.updated_at;
//     this.is_active = true;

//     return this;
//   }

//   toOdata(): Object {
//     return {
//       id: this.id,
//       first_name: this.first_name,
//       last_name: this.last_name,
//       email: this.email,
//       phone: this.phone,
//       address: this.address,
//       is_active: this.is_active,
//       created_at: undefined,
//       updated_at: undefined,
//     };
//   }
// }

export class User implements Deserializable {
  id?: number;
  first_name: string = '';
  last_name: string = '';
  email: string = '';
  phone: string = '';
  address: string = '';
  created_at?: string;
  updated_at?: string;
  is_active?: boolean;
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
