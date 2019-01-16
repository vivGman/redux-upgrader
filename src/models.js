class Scope extends Array {

    constructor(array = []) {
        super();

        [].concat(array).forEach(item => {
            this.push(item);
        });
    }

    get first() {
        return this[0]
    }

    get last() {
        return this[this.length - 1]
    }

}

class Hash extends Object {

    constructor(hash = {}) {
        super(hash);

        Object.keys(hash).forEach(key => {
            this[key] = hash[key];
        })
    }

}

export {
    Scope, Hash, Object, Array, Number, String
}