import { BaseEntity } from './../../shared';

export class Userinfo implements BaseEntity {
    constructor(
        public id?: number,
        public uid?: string,
        public cnp?: string,
        public name?: string,
        public prenume?: string,
        public dateOfBirth?: any,
        public adress?: string,
        public phoneNumber?: string,
        public idType?: string,
        public serialNumber?: string,
        public emittingCountry?: string,
        public expiringDate?: any,
        public loginid?: string,
    ) {
    }
}
