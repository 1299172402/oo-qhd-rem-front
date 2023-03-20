describe('Object', () => {
  

  describe("Object.keys", () => {
    const obj = {
      "str": "boz",
      "obj": { },
      "arr": [],
      "bool": true,
      "num": 42,
      "null": null,
      "undefined": undefined
    };

    const loopedValues = [];
    for (const k in obj) {
      loopedValues.push(k);
    }

    const keys = Object.keys(obj);
    it('should have correct length', () => {
      expect(keys.length).toBe(7);
    });

    it('should return an Array', () => {
      expect(Array.isArray(keys)).toBe(true);
    });

    it('should return names which are own properties', () => {
      keys.forEach((name) => {
        expect(obj.hasOwnProperty(name)).toBe(true);
      });
    });

    it('should return names which are enumerable', () => {
      keys.forEach((name) => {
        expect(loopedValues.indexOf(name)).toNotBe(-1);
      })
    });

    it('should throw error for non object', () => {
      const e = {};
      expect(() => {
        try {
          Object.keys(42)
        } catch (err) {
          throw e;
        }
      }).toThrow(e);
    });
  });

  describe("Object.isExtensible", () => {
    const obj = { };

    it('should return true if object is extensible', () => {
      expect(Object.isExtensible(obj)).toBe(true);
    });

    it('should return false if object is not extensible', () => {
      expect(Object.isExtensible(Object.preventExtensions(obj))).toBe(false);
    });

    it('should return false if object is seal', () => {
      expect(Object.isExtensible(Object.seal(obj))).toBe(false);
    });

    it('should return false if object is freeze', () => {
      expect(Object.isExtensible(Object.freeze(obj))).toBe(false);
    });

    it('should throw error for non object', () => {
      const e1 = {};
      expect(() => {
        try {
          Object.isExtensible(42)
        } catch (err) {
          throw e1;
        }
      }).toThrow(e1);
    });
  });

  describe("Object.defineProperty", () => {
    let obj;

    beforeEach(() => {
      obj = {};

      Object.defineProperty(obj, 'name', {
        value : 'Testing',
        configurable: true,
        enumerable: true,
        writable: true
      });
    });

    it('should return the initial value', () => {
      expect(obj.hasOwnProperty('name')).toBeTruthy();
      expect(obj.name).toBe('Testing');
    });

    it('should be setable', () => {
      obj.name = 'Other';
      expect(obj.name).toBe('Other');
    });

    it('should return the parent initial value', () => {
      const child = Object.create(obj, {});

      expect(child.name).toBe('Testing');
      expect(child.hasOwnProperty('name')).toBeFalsy();
    });

    it('should not override the parent value', () => {
      const child = Object.create(obj, {});

      Object.defineProperty(child, 'name', {
        value : 'Other'
      });

      expect(obj.name).toBe('Testing');
      expect(child.name).toBe('Other');
    });

    it('should throw error for non object', () => {
      expect(() => {
        Object.defineProperty(42, 'name', {});
      }).toThrow();
    });
  });

  describe("Object.getOwnPropertyDescriptor", () => {
    it('should return undefined because the object does not own the property', () => {
      const descr = Object.getOwnPropertyDescriptor({}, 'name');

      expect(descr).toBeUndefined()
    });

    it('should return a data descriptor', () => {
      const descr = Object.getOwnPropertyDescriptor({name: 'Testing'}, 'name');

      expect(descr).not.toBeUndefined();
      expect(descr.value).toBe('Testing');
      expect(descr.writable).toBe(true);
      expect(descr.enumerable).toBe(true);
      expect(descr.configurable).toBe(true);
    });

    it('should return undefined because the object does not own the property', () => {
      const descr = Object.getOwnPropertyDescriptor(Object.create({name: 'Testing'}, {}), 'name');

      expect(descr).toBeUndefined()
    });

    it('should return a data descriptor', () => {
      const obj = Object.create({}, {
        name: {
          value : 'Testing',
          configurable: true,
          enumerable: true,
          writable: true
        }
      });

      const descr = Object.getOwnPropertyDescriptor(obj, 'name');

      expect(descr).not.toBeUndefined();
      expect(descr.value).toBe('Testing');
      expect(descr.writable).toBe(true);
      expect(descr.enumerable).toBe(true);
      expect(descr.configurable).toBe(true);
    });

    	it('should throw error for non object', () => {
      expect(() => {
        Object.getOwnPropertyDescriptor(42, 'name');
      }).toThrow();
    });
  });
});
