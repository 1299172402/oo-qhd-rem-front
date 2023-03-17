describe('Array', () => {
  let testSubject;
  beforeEach(() => {
    testSubject = [2, 3, undefined, true, 'hej', null, false, 0];
    delete testSubject[1];
  });
  function createArrayLikeFromArray(arr) {
    const o = {};
    Array.prototype.forEach.call(arr, (e, i) => {
      o[i]=e;
    });
    o.length = arr.length;
    return o;
  }

  describe('forEach', () => {
    

    let expected; let actual;

    beforeEach(() => {
      expected = {0:2, 2: undefined, 3:true, 4: 'hej', 5:null, 6:false, 7:0 };
      actual = {};
    });
    it('should pass the right parameters', () => {
      const callback = jasmine.createSpy('callback');
      const array = ['1'];
      array.forEach(callback);
      expect(callback).toHaveBeenCalledWith('1', 0, array);
    });
    it('should not affect elements added to the array after it has begun', () => {
      const arr = [1,2,3];
      let i = 0;
      arr.forEach((a) => {
        i++;
        arr.push(a+3);
      });
      expect(arr).toEqual([1,2,3,4,5,6]);
      expect(i).toBe(3);
    });

    it('should set the right context when given none', () => {
      let context;
      [1].forEach(function() {context = this;});
      expect(context).toBe(function() {return this}.call());
    });
    it('should iterate all', () => {
      testSubject.forEach((obj, index) => {
        actual[index] = obj;
      });
      expect(actual).toExactlyMatch(expected);
    });
    it('should iterate all using a context', () => {
      const o = { a: actual };

      testSubject.forEach(function(obj, index) {
        this.a[index] = obj;
      }, o);
      expect(actual).toExactlyMatch(expected);
    });

    it('should iterate all in an array-like object', () => {
      const ts = createArrayLikeFromArray(testSubject);
      Array.prototype.forEach.call(ts, (obj, index) => {
        actual[index] = obj;
      });
      expect(actual).toExactlyMatch(expected);
    });
    it('should iterate all in an array-like object using a context', () => {
      const ts = createArrayLikeFromArray(testSubject);
      const o = { a: actual };

      Array.prototype.forEach.call(ts, function(obj, index) {
        this.a[index] = obj;
      }, o);
      expect(actual).toExactlyMatch(expected);
    });

    describe('strings', () => {
      const str = 'Hello, World!';
      const {toString} = Object.prototype;
      it('should iterate all in a string', () => {
        actual = [];
        Array.prototype.forEach.call(str, (item, index) => {
          actual[index] = item;
        });
        expect(actual).toExactlyMatch(str.split(''));
      });
      it('should iterate all in a string using a context', () => {
        actual = [];
        const o = { a: actual };
        Array.prototype.forEach.call(str, function(item, index) {
          this.a[index] = item;
        }, o);
        expect(actual).toExactlyMatch(str.split(''));
      });
      it('should have String object for third argument of callback', () => {
        Array.prototype.forEach.call(str, (item, index, obj) => {
          actual = obj;
        });
        expect(typeof actual).toBe("object");
        expect(toString.call(actual)).toBe("[object String]");
      });
    });
  });
  describe('some', () => {
    let actual; let expected; let numberOfRuns;

    beforeEach(() => {
      expected = {0:2, 2: undefined, 3:true };
      actual = {};
      numberOfRuns = 0;
    });

    it('should pass the correct values along to the callback', () => {
      const callback = jasmine.createSpy('callback');
      const array = ['1'];
      array.some(callback);
      expect(callback).toHaveBeenCalledWith('1', 0, array);
    });
    it('should not affect elements added to the array after it has begun', () => {
      const arr = [1,2,3];
      let i = 0;
      arr.some((a) => {
        i++;
        arr.push(a+3);
        return i > 3;
      });
      expect(arr).toEqual([1,2,3,4,5,6]);
      expect(i).toBe(3);
    });
    it('should set the right context when given none', () => {
      let context;
      [1].some(function() {context = this;});
      expect(context).toBe(function() {return this}.call());
    });

    it('should return false if it runs to the end', () => {
      actual = testSubject.some(() => {});
      expect(actual).toBeFalsy();
    });
    it('should return true if it is stopped somewhere', () => {
      actual = testSubject.some(() => true);
      expect(actual).toBeTruthy();
    });
    it('should return false if there are no elements', () => {
      actual = [].some(() => true);
      expect(actual).toBeFalsy();
    });

    it('should stop after 3 elements', () => {
      testSubject.some((obj, index) => {
        actual[index] = obj;
        numberOfRuns += 1;
        if(numberOfRuns == 3) {
          return true;
        }
        return false;
      });
      expect(actual).toExactlyMatch(expected);
    });
    it('should stop after 3 elements using a context', () => {
      const o = { a: actual };
      testSubject.some(function(obj, index) {
        this.a[index] = obj;
        numberOfRuns += 1;
        if(numberOfRuns == 3) {
          return true;
        }
        return false;
      }, o);
      expect(actual).toExactlyMatch(expected);
    });

    it('should stop after 3 elements in an array-like object', () => {
      const ts = createArrayLikeFromArray(testSubject);
      Array.prototype.some.call(ts, (obj, index) => {
        actual[index] = obj;
        numberOfRuns += 1;
        if(numberOfRuns == 3) {
          return true;
        }
        return false;
      });
      expect(actual).toExactlyMatch(expected);
    });
    it('should stop after 3 elements in an array-like object using a context', () => {
      const ts = createArrayLikeFromArray(testSubject);
      const o = { a: actual };
      Array.prototype.some.call(ts, function(obj, index) {
        this.a[index] = obj;
        numberOfRuns += 1;
        if(numberOfRuns == 3) {
          return true;
        }
        return false;
      }, o);
      expect(actual).toExactlyMatch(expected);
    });
  });
  describe('every', () => {
    let actual; let expected; let numberOfRuns;

    beforeEach(() => {
      expected = {0:2, 2: undefined, 3:true };
      actual = {};
      numberOfRuns = 0;
    });

    it('should pass the correct values along to the callback', () => {
      const callback = jasmine.createSpy('callback');
      const array = ['1'];
      array.every(callback);
      expect(callback).toHaveBeenCalledWith('1', 0, array);
    });
    it('should not affect elements added to the array after it has begun', () => {
      const arr = [1,2,3];
      let i = 0;
      arr.every((a) => {
        i++;
        arr.push(a+3);
        return i <= 3;
      });
      expect(arr).toEqual([1,2,3,4,5,6]);
      expect(i).toBe(3);
    });
    it('should set the right context when given none', () => {
      let context;
      [1].every(function() {context = this;});
      expect(context).toBe(function() {return this}.call());
    });

    it('should return true if the array is empty', () => {
      actual = [].every(() => true);
      expect(actual).toBeTruthy();

      actual = [].every(() => false);
      expect(actual).toBeTruthy();
    });
    it('should return true if it runs to the end', () => {
      actual = [1,2,3].every(() => true);
      expect(actual).toBeTruthy();
    });
    it('should return false if it is stopped before the end', () => {
      actual = [1,2,3].every(() => false);
      expect(actual).toBeFalsy();
    });

    it('should return after 3 elements', () => {
      testSubject.every((obj, index) => {
        actual[index] = obj;
        numberOfRuns += 1;
        if(numberOfRuns == 3) {
          return false;
        }
        return true;
      });
      expect(actual).toExactlyMatch(expected);
    });
    it('should stop after 3 elements using a context', () => {
      const o = { a: actual };
      testSubject.every(function(obj, index) {
        this.a[index] = obj;
        numberOfRuns += 1;
        if(numberOfRuns == 3) {
          return false;
        }
        return true;
      }, o);
      expect(actual).toExactlyMatch(expected);
    });

    it('should stop after 3 elements in an array-like object', () => {
      const ts = createArrayLikeFromArray(testSubject);
      Array.prototype.every.call(ts, (obj, index) => {
        actual[index] = obj;
        numberOfRuns += 1;
        if(numberOfRuns == 3) {
          return false;
        }
        return true;
      });
      expect(actual).toExactlyMatch(expected);
    });
    it('should stop after 3 elements in an array-like object using a context', () => {
      const ts = createArrayLikeFromArray(testSubject);
      const o = { a: actual };
      Array.prototype.every.call(ts, function(obj, index) {
        this.a[index] = obj;
        numberOfRuns += 1;
        if(numberOfRuns == 3) {
          return false;
        }
        return true;
      }, o);
      expect(actual).toExactlyMatch(expected);
    });
  });

  describe('indexOf', () => {
    

    let actual; let expected; let testSubject;

    beforeEach(() => {
      testSubject = [2, 3, undefined, true, 'hej', null, 2, false, 0];
      delete testSubject[1];

    });

    it('should find the element', () => {
      expected = 4;
      actual = testSubject.indexOf('hej');
      expect(actual).toEqual(expected);
    });
    it('should not find the element', () => {
      expected = -1;
      actual = testSubject.indexOf('mus');
      expect(actual).toEqual(expected);
    });
    it('should find undefined as well', () => {
      expected = -1;
      actual = testSubject.indexOf(undefined);
      expect(actual).not.toEqual(expected);
    });
    it('should skip unset indexes', () => {
      expected = 2;
      actual = testSubject.indexOf(undefined);
      expect(actual).toEqual(expected);
    });
    it('should use a strict test', () => {
      actual = testSubject.indexOf(null);
      expect(actual).toEqual(5);

      actual = testSubject.indexOf('2');
      expect(actual).toEqual(-1);
    });
    it('should skip the first if fromIndex is set', () => {
      expect(testSubject.indexOf(2, 2)).toEqual(6);
      expect(testSubject.indexOf(2, 0)).toEqual(0);
      expect(testSubject.indexOf(2, 6)).toEqual(6);
    });
    it('should work with negative fromIndex', () => {
      expect(testSubject.indexOf(2, -3)).toEqual(6);
      expect(testSubject.indexOf(2, -9)).toEqual(0);
    });
    it('should work with fromIndex being greater than the length', () => {
      expect(testSubject.indexOf(0, 20)).toEqual(-1);
    });
    it('should work with fromIndex being negative and greater than the length', () => {
      expect(testSubject.indexOf('hej', -20)).toEqual(4);
    });

    describe('Array-like', () => {
      const {indexOf} = Array.prototype;
      let testAL;
      beforeEach(() => {
        testAL = {};
        testSubject = [2, 3, undefined, true, 'hej', null, 2, false, 0];
        testSubject.forEach((o,i) => {
          testAL[i] = o;
        });
        testAL.length = testSubject.length;
      });
      it('should find the element (array-like)', () => {
        expected = 4;
        actual = indexOf.call(testAL, 'hej');
        expect(actual).toEqual(expected);
      });
      it('should not find the element (array-like)', () => {
        expected = -1;
        actual = indexOf.call(testAL, 'mus');
        expect(actual).toEqual(expected);
      });
      it('should find undefined as well (array-like)', () => {
        expected = -1;
        actual = indexOf.call(testAL, undefined);
        expect(actual).not.toEqual(expected);
      });
      it('should skip unset indexes (array-like)', () => {
        expected = 2;
        actual = indexOf.call(testAL, undefined);
        expect(actual).toEqual(expected);
      });
      it('should use a strict test (array-like)', () => {
        actual = Array.prototype.indexOf.call(testAL, null);
        expect(actual).toEqual(5);

        actual = Array.prototype.indexOf.call(testAL, '2');
        expect(actual).toEqual(-1);
      });
      it('should skip the first if fromIndex is set (array-like)', () => {
        expect(indexOf.call(testAL, 2, 2)).toEqual(6);
        expect(indexOf.call(testAL, 2, 0)).toEqual(0);
        expect(indexOf.call(testAL, 2, 6)).toEqual(6);
      });
      it('should work with negative fromIndex (array-like)', () => {
        expect(indexOf.call(testAL, 2, -3)).toEqual(6);
        expect(indexOf.call(testAL, 2, -9)).toEqual(0);
      });
      it('should work with fromIndex being greater than the length (array-like)', () => {
        expect(indexOf.call(testAL, 0, 20)).toEqual(-1);
      });
      it('should work with fromIndex being negative and greater than the length (array-like)', () => {
        expect(indexOf.call(testAL, 'hej', -20)).toEqual(4);
      });
    });
  });
  describe('lastIndexOf', () => {
    

    let actual; let expected; let testSubject; let testAL;

    beforeEach(() => {
      testSubject = [2, 3, undefined, true, 'hej', null, 2, 3, false, 0];
      delete testSubject[1];
      delete testSubject[7];
    });
    describe('Array', () => {
      it('should find the element', () => {
        expected = 4;
        actual = testSubject.lastIndexOf('hej');
        expect(actual).toEqual(expected);
      });
      it('should not find the element', () => {
        expected = -1;
        actual = testSubject.lastIndexOf('mus');
        expect(actual).toEqual(expected);
      });
      it('should find undefined as well', () => {
        expected = -1;
        actual = testSubject.lastIndexOf(undefined);
        expect(actual).not.toEqual(expected);
      });
      it('should skip unset indexes', () => {
        expected = 2;
        actual = testSubject.lastIndexOf(undefined);
        expect(actual).toEqual(expected);
      });
      it('should use a strict test', () => {
        actual = testSubject.lastIndexOf(null);
        expect(actual).toEqual(5);

        actual = testSubject.lastIndexOf('2');
        expect(actual).toEqual(-1);
      });
      it('should skip the first if fromIndex is set', () => {
        expect(testSubject.lastIndexOf(2, 2)).toEqual(0);
        expect(testSubject.lastIndexOf(2, 0)).toEqual(0);
        expect(testSubject.lastIndexOf(2, 6)).toEqual(6);
      });
      it('should work with negative fromIndex', () => {
        expect(testSubject.lastIndexOf(2, -3)).toEqual(6);
        expect(testSubject.lastIndexOf(2, -9)).toEqual(0);
      });
      it('should work with fromIndex being greater than the length', () => {
        expect(testSubject.lastIndexOf(2, 20)).toEqual(6);
      });
      it('should work with fromIndex being negative and greater than the length', () => {
        expect(testSubject.lastIndexOf(2, -20)).toEqual(-1);
      });
    });

    describe('Array like', () => {
      const {lastIndexOf} = Array.prototype;
      let testAL;
      beforeEach(() => {
        testAL = {};
        testSubject.forEach((o,i) => {
          testAL[i] = o;
        });
        testAL.length = testSubject.length;
      });
      it('should find the element (array-like)', () => {
        expected = 4;
        actual = lastIndexOf.call(testAL, 'hej');
        expect(actual).toEqual(expected);
      });
      it('should not find the element (array-like)', () => {
        expected = -1;
        actual = lastIndexOf.call(testAL, 'mus');
        expect(actual).toEqual(expected);
      });
      it('should find undefined as well (array-like)', () => {
        expected = -1;
        actual = lastIndexOf.call(testAL, undefined);
        expect(actual).not.toEqual(expected);
      });
      it('should skip unset indexes (array-like)', () => {
        expected = 2;
        actual = lastIndexOf.call(testAL, undefined);
        expect(actual).toEqual(expected);
      });
      it('should use a strict test (array-like)', () => {
        actual = lastIndexOf.call(testAL, null);
        expect(actual).toEqual(5);

        actual = lastIndexOf.call(testAL, '2');
        expect(actual).toEqual(-1);
      });
      it('should skip the first if fromIndex is set', () => {
        expect(lastIndexOf.call(testAL, 2, 2)).toEqual(0);
        expect(lastIndexOf.call(testAL, 2, 0)).toEqual(0);
        expect(lastIndexOf.call(testAL, 2, 6)).toEqual(6);
      });
      it('should work with negative fromIndex', () => {
        expect(lastIndexOf.call(testAL, 2, -3)).toEqual(6);
        expect(lastIndexOf.call(testAL, 2, -9)).toEqual(0);
      });
      it('should work with fromIndex being greater than the length', () => {
        expect(lastIndexOf.call(testAL, 2, 20)).toEqual(6);
      });
      it('should work with fromIndex being negative and greater than the length', () => {
        expect(lastIndexOf.call(testAL, 2, -20)).toEqual(-1);
      });
    });
  });

  describe('filter', () => {
    let filteredArray;
    const callback = function callback(o, i, arr) {
      return (
        i != 3 && i != 5
      );
    };

    beforeEach(() => {
      testSubject = [2, 3, undefined, true, 'hej', 3, null, false, 0];
      delete testSubject[1];
      filteredArray = [2, undefined, 'hej', null, false, 0];
    });
    describe('Array object', () => {

      it('should call the callback with the proper arguments', () => {
        const callback = jasmine.createSpy('callback');
        const arr = ['1'];
        arr.filter(callback);
        expect(callback).toHaveBeenCalledWith('1', 0, arr);
      });
      it('should not affect elements added to the array after it has begun', () => {
        const arr = [1,2,3];
        let i = 0;
        arr.filter((a) => {
          i++;
          if(i <= 4) {
            arr.push(a+3);
          }
          return true;
        });
        expect(arr).toEqual([1,2,3,4,5,6]);
        expect(i).toBe(3);
      });
      it('should skip non-set values', () => {
        const passedValues = {};
        testSubject = [1,2,3,4];
        delete testSubject[1];
        testSubject.filter((o, i) => {
          passedValues[i] = o;
          return true;
        });
        expect(passedValues).toExactlyMatch(testSubject);
      });
      it('should pass the right context to the filter', () => {
        const passedValues = {};
        testSubject = [1,2,3,4];
        delete testSubject[1];
        testSubject.filter(function(o, i) {
          this[i] = o;
          return true;
        }, passedValues);
        expect(passedValues).toExactlyMatch(testSubject);
      });
      it('should set the right context when given none', () => {
        let context;
        [1].filter(function() {context = this;});
        expect(context).toBe(function() {return this}.call());
      });
      it('should remove only the values for which the callback returns false', () => {
        const result = testSubject.filter(callback);
        expect(result).toExactlyMatch(filteredArray);
      });
      it('should leave the original array untouched', () => {
        const copy = testSubject.slice();
        testSubject.filter(callback);
        expect(testSubject).toExactlyMatch(copy);
      });
      it('should not be affected by same-index mutation', () => {
        const results = [1, 2, 3]
          .filter((value, index, array) => {
            array[index] = 'a';
            return true;
          });
        expect(results).toEqual([1, 2, 3]);
      });
    });
    describe('Array like', () => {
      beforeEach(() => {
        testSubject = createArrayLikeFromArray(testSubject);
      });
      it('should call the callback with the proper arguments', () => {
        const callback = jasmine.createSpy('callback');
        const arr = createArrayLikeFromArray(['1']);
        Array.prototype.filter.call(arr, callback);
        expect(callback).toHaveBeenCalledWith('1', 0, arr);
      });
      it('should not affect elements added to the array after it has begun', () => {
        const arr = createArrayLikeFromArray([1,2,3]);
        let i = 0;
        Array.prototype.filter.call(arr, (a) => {
          i++;
          if(i <= 4) {
            arr[i+2] = a+3;
          }
          return true;
        });
        delete arr.length;
        expect(arr).toExactlyMatch([1,2,3,4,5,6]);
        expect(i).toBe(3);
      });
      it('should skip non-set values', () => {
        const passedValues = {};
        testSubject = createArrayLikeFromArray([1,2,3,4]);
        delete testSubject[1];
        Array.prototype.filter.call(testSubject, (o, i) => {
          passedValues[i] = o;
          return true;
        });
        delete testSubject.length;
        expect(passedValues).toExactlyMatch(testSubject);
      });
      it('should set the right context when given none', () => {
        let context;
        Array.prototype.filter.call(createArrayLikeFromArray([1]), function() {context = this;}, undefined);
        expect(context).toBe(function() {return this}.call());
      });
      it('should pass the right context to the filter', () => {
        const passedValues = {};
        testSubject = createArrayLikeFromArray([1,2,3,4]);
        delete testSubject[1];
        Array.prototype.filter.call(testSubject, function(o, i) {
          this[i] = o;
          return true;
        }, passedValues);
        delete testSubject.length;
        expect(passedValues).toExactlyMatch(testSubject);
      });
      it('should remove only the values for which the callback returns false', () => {
        const result = Array.prototype.filter.call(testSubject, callback);
        expect(result).toExactlyMatch(filteredArray);
      });
      it('should leave the original array untouched', () => {
        const copy = createArrayLikeFromArray(testSubject);
        Array.prototype.filter.call(testSubject, callback);
        expect(testSubject).toExactlyMatch(copy);
      });
    });
  });
  describe('map', () => {
    let callback;
    beforeEach(() => {
      let i = 0;
      callback = function() {
        return i++;
      };
    });
    describe('Array object', () => {
      it('should call callback with the right parameters', () => {
        const callback = jasmine.createSpy('callback');
        const array = [1];
        array.map(callback);
        expect(callback).toHaveBeenCalledWith(1, 0, array);
      });
      it('should set the context correctly', () => {
        const context = {};
        testSubject.map(function(o,i) {
          this[i] = o;
        }, context);
        expect(context).toExactlyMatch(testSubject);
      });
      it('should set the right context when given none', () => {
        let context;
        [1].map(function() {context = this;});
        expect(context).toBe(function() {return this}.call());
      });
      it('should not change the array it is called on', () => {
        const copy = testSubject.slice();
        testSubject.map(callback);
        expect(testSubject).toExactlyMatch(copy);
      });
      it('should only run for the number of objects in the array when it started', () => {
        const arr = [1,2,3];
        let i = 0;
        arr.map((o) => {
          arr.push(o+3);
          i++;
          return o;
        });
        expect(arr).toExactlyMatch([1,2,3,4,5,6]);
        expect(i).toBe(3);
      });
      it('should properly translate the values as according to the callback', () => {
        const result = testSubject.map(callback);
        const expected = [0,0,1,2,3,4,5,6];
        delete expected[1];
        expect(result).toExactlyMatch(expected);
      });
      it('should skip non-existing values', () => {
        const array = [1,2,3,4];
        let i = 0;
        delete array[2];
        array.map(() => {
          i++;
        });
        expect(i).toBe(3);
      });
    });
    describe('Array-like', () => {
      beforeEach(() => {
        testSubject = createArrayLikeFromArray(testSubject);
      });
      it('should call callback with the right parameters', () => {
        const callback = jasmine.createSpy('callback');
        const array = createArrayLikeFromArray([1]);
        Array.prototype.map.call(array, callback);
        expect(callback).toHaveBeenCalledWith(1, 0, array);
      });
      it('should set the context correctly', () => {
        const context = {};
        Array.prototype.map.call(testSubject, function(o,i) {
          this[i] = o;
        }, context);
        delete testSubject.length;
        expect(context).toExactlyMatch(testSubject);
      });
      it('should set the right context when given none', () => {
        let context;
        Array.prototype.map.call(createArrayLikeFromArray([1]), function() {context = this;});
        expect(context).toBe(function() {return this}.call());
      });
      it('should not change the array it is called on', () => {
        const copy = createArrayLikeFromArray(testSubject);
        Array.prototype.map.call(testSubject, callback);
        expect(testSubject).toExactlyMatch(copy);
      });
      it('should only run for the number of objects in the array when it started', () => {
        const arr = createArrayLikeFromArray([1,2,3]);
        let i = 0;
        Array.prototype.map.call(arr, (o) => {
          Array.prototype.push.call(arr, o+3);
          i++;
          return o;
        });
        delete arr.length;
        expect(arr).toExactlyMatch([1,2,3,4,5,6]);
        expect(i).toBe(3);
      });
      it('should properly translate the values as according to the callback', () => {
        const result = Array.prototype.map.call(testSubject, callback);
        const expected = [0,0,1,2,3,4,5,6];
        delete expected[1];
        expect(result).toExactlyMatch(expected);
      });
      it('should skip non-existing values', () => {
        const array = createArrayLikeFromArray([1,2,3,4]);
        let i = 0;
        delete array[2];
        Array.prototype.map.call(array, () => {
          i++;
        });
        expect(i).toBe(3);
      });
    });
  });

  describe('reduce', () => {
    beforeEach(() => {
      testSubject = [1,2,3];
    });

    describe('Array', () => {
      it('should pass the correct arguments to the callback', () => {
        const spy = jasmine.createSpy().andReturn(0);
        testSubject.reduce(spy);
        expect(spy.calls[0].args).toExactlyMatch([1, 2, 1, testSubject]);
      });
      it('should start with the right initialValue', () => {
        const spy = jasmine.createSpy().andReturn(0);
        testSubject.reduce(spy, 0);
        expect(spy.calls[0].args).toExactlyMatch([0, 1, 0, testSubject]);
      });
      it('should not affect elements added to the array after it has begun', () => {
        const arr = [1,2,3];
        let i = 0;
        arr.reduce((a, b) => {
          i++;
          if(i <= 4) {
            arr.push(a+3);
          }
          return b;
        });
        expect(arr).toEqual([1,2,3,4,5]);
        expect(i).toBe(2);
      });
      it('should work as expected for empty arrays', () => {
        const spy = jasmine.createSpy();
        expect(() => {
          [].reduce(spy);
        }).toThrow();
        expect(spy).not.toHaveBeenCalled();
      });
      it('should throw correctly if no callback is given', () => {
        expect(() => {
          testSubject.reduce();
        }).toThrow();
      });
      it('should return the expected result', () => {
        expect(testSubject.reduce((a,b) => (a||'').toString()+(b||'').toString())).toEqual(testSubject.join(''));
      });
      it('should not directly affect the passed array', () => {
        const copy = testSubject.slice();
        testSubject.reduce((a,b) => a+b);
        expect(testSubject).toEqual(copy);
      });
      it('should skip non-set values', () => {
        delete testSubject[1];
        const visited = {};
        testSubject.reduce((a,b) => {
          if(a)
            visited[a] = true;
          if(b)
            visited[b] = true;
          return 0;
        });

        expect(visited).toEqual({ '1': true, '3': true });
      });
      it('should have the right length', () => {
        expect(testSubject.reduce.length).toBe(1);
      });
    });
    describe('Array-like objects', () => {
      beforeEach(() => {
        testSubject = createArrayLikeFromArray(testSubject);
        testSubject.reduce = Array.prototype.reduce;
      });
      it('should pass the correct arguments to the callback', () => {
        const spy = jasmine.createSpy().andReturn(0);
        testSubject.reduce(spy);
        expect(spy.calls[0].args).toExactlyMatch([1, 2, 1, testSubject]);
      });
      it('should start with the right initialValue', () => {
        const spy = jasmine.createSpy().andReturn(0);
        testSubject.reduce(spy, 0);
        expect(spy.calls[0].args).toExactlyMatch([0, 1, 0, testSubject]);
      });
      it('should not affect elements added to the array after it has begun', () => {
        const arr = createArrayLikeFromArray([1,2,3]);
        let i = 0;
        Array.prototype.reduce.call(arr, (a, b) => {
          i++;
          if(i <= 4) {
            arr[i+2] = a+3;
          }
          return b;
        });
        expect(arr).toEqual({
          0: 1,
          1: 2,
          2: 3,
          3: 4,
          4: 5,
          length: 3
        });
        expect(i).toBe(2);
      });
      it('should work as expected for empty arrays', () => {
        const spy = jasmine.createSpy();
        expect(() => {
          Array.prototype.reduce.call({length: 0}, spy);
        }).toThrow();
        expect(spy).not.toHaveBeenCalled();
      });
      it('should throw correctly if no callback is given', () => {
        expect(() => {
          testSubject.reduce();
        }).toThrow();
      });
      it('should return the expected result', () => {
        expect(testSubject.reduce((a,b) => (a||'').toString()+(b||'').toString())).toEqual('123');
      });
      it('should not directly affect the passed array', () => {
        const copy = createArrayLikeFromArray(testSubject);
        testSubject.reduce((a,b) => a+b);
        delete(testSubject.reduce);
        expect(testSubject).toEqual(copy);
      });
      it('should skip non-set values', () => {
        delete testSubject[1];
        const visited = {};
        testSubject.reduce((a,b) => {
          if(a)
            visited[a] = true;
          if(b)
            visited[b] = true;
          return 0;
        });

        expect(visited).toEqual({ '1': true, '3': true });
      });
      it('should have the right length', () => {
        expect(testSubject.reduce.length).toBe(1);
      });
    });
  });
  describe('reduceRight', () => {
    beforeEach(() => {
      testSubject = [1,2,3];
    });

    describe('Array', () => {
      it('should pass the correct arguments to the callback', () => {
        const spy = jasmine.createSpy().andReturn(0);
        testSubject.reduceRight(spy);
        expect(spy.calls[0].args).toExactlyMatch([3, 2, 1, testSubject]);
      });
      it('should start with the right initialValue', () => {
        const spy = jasmine.createSpy().andReturn(0);
        testSubject.reduceRight(spy, 0);
        expect(spy.calls[0].args).toExactlyMatch([0, 3, 2, testSubject]);
      });
      it('should not affect elements added to the array after it has begun', () => {
        const arr = [1,2,3];
        let i = 0;
        arr.reduceRight((a, b) => {
          i++;
          if(i <= 4) {
            arr.push(a+3);
          }
          return b;
        });
        expect(arr).toEqual([1,2,3,6,5]);
        expect(i).toBe(2);
      });
      it('should work as expected for empty arrays', () => {
        const spy = jasmine.createSpy();
        expect(() => {
          [].reduceRight(spy);
        }).toThrow();
        expect(spy).not.toHaveBeenCalled();
      });
      it('should work as expected for empty arrays with an initial value', () => {
        const spy = jasmine.createSpy();
        let result;

        result = [].reduceRight(spy, '');
        expect(spy).not.toHaveBeenCalled();
        expect(result).toBe('');
      });
      it('should throw correctly if no callback is given', () => {
        expect(() => {
          testSubject.reduceRight();
        }).toThrow();
      });
      it('should return the expected result', () => {
        expect(testSubject.reduceRight((a,b) => (a||'').toString()+(b||'').toString())).toEqual('321');
      });
      it('should not directly affect the passed array', () => {
        const copy = testSubject.slice();
        testSubject.reduceRight((a,b) => a+b);
        expect(testSubject).toEqual(copy);
      });
      it('should skip non-set values', () => {
        delete testSubject[1];
        const visited = {};
        testSubject.reduceRight((a,b) => {
          if(a)
            visited[a] = true;
          if(b)
            visited[b] = true;
          return 0;
        });

        expect(visited).toEqual({ '1': true, '3': true });
      });
      it('should have the right length', () => {
        expect(testSubject.reduceRight.length).toBe(1);
      });
    });
    describe('Array-like objects', () => {
      beforeEach(() => {
        testSubject = createArrayLikeFromArray(testSubject);
        testSubject.reduceRight = Array.prototype.reduceRight;
      });
      it('should pass the correct arguments to the callback', () => {
        const spy = jasmine.createSpy().andReturn(0);
        testSubject.reduceRight(spy);
        expect(spy.calls[0].args).toExactlyMatch([3, 2, 1, testSubject]);
      });
      it('should start with the right initialValue', () => {
        const spy = jasmine.createSpy().andReturn(0);
        testSubject.reduceRight(spy, 0);
        expect(spy.calls[0].args).toExactlyMatch([0, 3, 2, testSubject]);
      });
      it('should not affect elements added to the array after it has begun', () => {
        const arr = createArrayLikeFromArray([1,2,3]);
        let i = 0;
        Array.prototype.reduceRight.call(arr, (a, b) => {
          i++;
          if(i <= 4) {
            arr[i+2] = a+3;
          }
          return b;
        });
        expect(arr).toEqual({
          0: 1,
          1: 2,
          2: 3,
          3: 6,
          4: 5,
          length: 3 // does not get updated on property assignment
        });
        expect(i).toBe(2);
      });
      it('should work as expected for empty arrays', () => {
        const spy = jasmine.createSpy();
        expect(() => {
          Array.prototype.reduceRight.call({length:0}, spy);
        }).toThrow();
        expect(spy).not.toHaveBeenCalled();
      });
      it('should throw correctly if no callback is given', () => {
        expect(() => {
          testSubject.reduceRight();
        }).toThrow();
      });
      it('should return the expected result', () => {
        expect(testSubject.reduceRight((a,b) => (a||'').toString()+(b||'').toString())).toEqual('321');
      });
      it('should not directly affect the passed array', () => {
        const copy = createArrayLikeFromArray(testSubject);
        testSubject.reduceRight((a,b) => a+b);
        delete(testSubject.reduceRight);
        expect(testSubject).toEqual(copy);
      });
      it('should skip non-set values', () => {
        delete testSubject[1];
        const visited = {};
        testSubject.reduceRight((a,b) => {
          if(a)
            visited[a] = true;
          if(b)
            visited[b] = true;
          return 0;
        });

        expect(visited).toEqual({ '1': true, '3': true });
      });
      it('should have the right length', () => {
        expect(testSubject.reduceRight.length).toBe(1);
      });
    });
  });

  describe('isArray', () => {
    it('should work for Array', () => {
      const ret = Array.isArray([]);

      expect(ret).toBe(true);
    });

    it('should fail for other objects', function () {
      const objects = [
        "someString",
        true,
        false,
        42,
        0,
        {},
        Object.create && Object.create(null) || null,
        /foo/,
        arguments,
        document.getElementsByTagName("div")
      ];

      objects.forEach((v) => {
        expect(Array.isArray(v)).toBe(false);
      });
    });
  });

  describe('unshift', () => {
    it('should return length', () => {
      expect([].unshift(0)).toEqual(1);
    });
  });

  describe('splice', () => {
    const b = ["b"];
    const a = [1, "a", b];
    let test;

    const makeArray = function(l, prefix) {
      prefix = prefix || "";
      const a = [];
      while (l--) {
        a.unshift(prefix + Array(l + 1).join(" ") + l)
      }
      return a
    };

    beforeEach(() => {
      test = a.slice(0);
    });

    it('basic implementation test 1', () => {
      expect(test.splice(0)).toEqual(a);
    });
    it('basic implementation test 2', () => {
      test.splice(0, 2);
      expect(test).toEqual([b]);
    });

    it('should return right result 1', () => {
      expect((function() {
        const array = [];

        array.splice(0, 0, 1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20);
        array.splice(1, 0, "F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10", "F11", "F12", "F13", "F14", "F15", "F16", "F17", "F18", "F19", "F20", "F21","F22", "F23", "F24", "F25", "F26");
        array.splice(5, 0, "XXX");

        return array.join("|");
      }())).toBe("1|F1|F2|F3|F4|XXX|F5|F6|F7|F8|F9|F10|F11|F12|F13|F14|F15|F16|F17|F18|F19|F20|F21|F22|F23|F24|F25|F26|2|3|4|5|6|7|8|9|10|11|12|13|14|15|16|17|18|19|20");
    });

    it('should return right result 2', () => {
      expect((function() {
        const array = makeArray(6);

        array.splice(array.length - 1, 1, "");
        array.splice(0, 1, 1,2,3,4);
        array.splice(0, 0, 1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20, 21, 22, 23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45);

        array.splice(4, 0, "99999999999999");
        return array.join("|");
      }())).toBe("1|2|3|4|99999999999999|5|6|7|8|9|10|11|12|13|14|15|16|17|18|19|20|21|22|23|24|25|26|27|28|29|30|31|32|33|34|35|36|37|38|39|40|41|42|43|44|45|1|2|3|4| 1|  2|   3|    4|");
    });

    it('should return right result 3', () => {
      expect((function() {
        const array = [1,2,3];

        array.splice(0);
        array.splice(0, 1, 1,2,3,4,5,6,7,8,9,10);
        array.splice(1, 1, "F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10", "F11", "F12", "F13", "F14", "F15", "F16", "F17", "F18", "F19", "F20", "F21","F22", "F23", "F24", "F25", "F26");
        array.splice(5, 1, "YYY", "XXX");
        array.splice(0, 1);
        array.splice(0, 2);
        array.pop();
        array.push.apply(array, makeArray(10, "-"));
        array.splice(array.length - 2, 10);
        array.splice();
        array.splice(1, 1, 1,2,3,4,5,6,7,8,9,10,1,2,3,4,5,6,7,8,9);
        array.splice(1, 1, "F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10", "F11", "F12", "F13", "F14", "F15", "F16", "F17", "F18", "F19", "F20", "F21","F22", "F23", "F24", "F25", "F26",1,23,4,5,6,7,8);
        array.splice(30, 10);
        array.splice(30, 1);
        array.splice(30, 0);
        array.splice(2, 5, 1,2,3,"P", "LLL", "CCC", "YYY", "XXX");
        array.push(1,2,3,4,5,6);
        array.splice(1, 6, 1,2,3,4,5,6,7,8,9,4,5,6,7,8,9);
        array.splice(3, 7);
        array.unshift(7,8,9,10,11);
        array.pop();
        array.splice(5, 2);
        array.pop();
        array.unshift.apply(array, makeArray(8, "~"));
        array.pop();
        array.splice(3, 1, "F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10", "F11", "F12", "F13", "F14", "F15", "F16", "F17", "F18", "F19", "F20", "F21","F22", "F23", "F24", "F25", "F26",1,23,4,5,6,7,8);
        array.splice(4, 5, "P", "LLL", "CCC", "YYY", "XXX");

        return array.join("|");
      }())).toBe("~0|~ 1|~  2|F1|P|LLL|CCC|YYY|XXX|F7|F8|F9|F10|F11|F12|F13|F14|F15|F16|F17|F18|F19|F20|F21|F22|F23|F24|F25|F26|1|23|4|5|6|7|8|~    4|~     5|~      6|~       7|7|8|9|10|11|2|4|5|6|7|8|9|CCC|YYY|XXX|F7|F8|F9|F10|F11|F12|F13|F14|F15|F16|F17|F18|F19|F20|F21|F22|F23|F24|F25|F26|1|23|4|9|10|1|2|3|4|5|6|7|8|9|YYY|XXX|F6|F7|F8|F9|F10|F11|F12|F13|F14|F15|F16|F17|F18|F19|F20|F21|F22|F23|F24|F25|F26|3|4|5|6|7|8|9|-0|- 1|-  2|-   3|-    4|-     5|-      6|-       7|1|2|3");
    });


    it('should do nothing if method called with no arguments', () => {
      expect(test.splice()).toEqual([]);
      expect(test).toEqual(a);
    });
    // TODO:: Is this realy TRUE behavior?
    it('should set first argument to 0 if first argument is set but undefined', () => {
      const test2 = test.slice(0);
      expect(test.splice(void 0, 2)).toEqual(test2.splice(0, 2));
      expect(test).toEqual(test2);
    });

    it('should deleted and return all items after "start" when second argument is undefined', () => {
      expect(test.splice(0)).toEqual(a);
      expect(test).toEqual([]);
    });
    it('should deleted and return all items after "start" when second argument is undefined', () => {
      expect(test.splice(2)).toEqual([b]);
      expect(test).toEqual([1, "a"]);
    });
    it('runshould have the right length', () => {
      expect(test.splice.length).toBe(2);
    });
  });


});
