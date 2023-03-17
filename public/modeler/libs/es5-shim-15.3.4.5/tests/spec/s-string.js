describe('String', () => {
  

  describe("trim", () => {
    const test = "\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFFHello, World!\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF";

    it('trims all ES5 whitespace', () => {
      expect(test.trim()).toEqual("Hello, World!");
      expect(test.trim().length).toEqual(13);
    });
  });

  describe("split", () => {
    const test = "ab";

    it('If "separator" is undefined must return Array with one String - "this" string', () => {
      expect(test.split()).toEqual([test]);
      expect(test.split(void 0)).toEqual([test]);
    });

    it('If "separator" is undefined and "limit" set to 0 must return Array[]', () => {
      expect(test.split(void 0, 0)).toEqual([]);
    });

    describe('Tests from Steven Levithan', () => {
      it("''.split() results in ['']", () => {
        expect(''.split()).toEqual(['']);
      });
      it("''.split(/./) results in ['']", () => {
        expect(''.split(/./)).toEqual(['']);
      });
      it("''.split(/.?/) results in []", () => {
        expect(''.split(/.?/)).toEqual([]);
      });
      it("''.split(/.??/) results in []", () => {
        expect(''.split(/.??/)).toEqual([]);
      });
      it("'ab'.split(/a*/) results in ['', 'b']", () => {
        expect('ab'.split(/a*/)).toEqual(['', 'b']);
      });
      it("'ab'.split(/a*?/) results in ['a', 'b']", () => {
        expect('ab'.split(/a*?/)).toEqual(['a', 'b']);
      });
      it("'ab'.split(/(?:ab)/) results in ['', '']", () => {
        expect('ab'.split(/(?:ab)/)).toEqual(['', '']);
      });
      it("'ab'.split(/(?:ab)*/) results in ['', '']", () => {
        expect('ab'.split(/(?:ab)*/)).toEqual(['', '']);
      });
      it("'ab'.split(/(?:ab)*?/) results in ['a', 'b']", () => {
        expect('ab'.split(/(?:ab)*?/)).toEqual(['a', 'b']);
      });
      it("'test'.split('') results in ['t', 'e', 's', 't']", () => {
        expect('test'.split('')).toEqual(['t', 'e', 's', 't']);
      });
      it("'test'.split() results in ['test']", () => {
        expect('test'.split()).toEqual(['test']);
      });
      it("'111'.split(1) results in ['', '', '', '']", () => {
        expect('111'.split(1)).toEqual(['', '', '', '']);
      });
      it("'test'.split(/(?:)/, 2) results in ['t', 'e']", () => {
        expect('test'.split(/(?:)/, 2)).toEqual(['t', 'e']);
      });
      it("'test'.split(/(?:)/, -1) results in ['t', 'e', 's', 't']", () => {
        expect('test'.split(/(?:)/, -1)).toEqual(['t', 'e', 's', 't']);
      });
      it("'test'.split(/(?:)/, undefined) results in ['t', 'e', 's', 't']", () => {
        expect('test'.split(/(?:)/, undefined)).toEqual(['t', 'e', 's', 't']);
      });
      it("'test'.split(/(?:)/, null) results in []", () => {
        expect('test'.split(/(?:)/, null)).toEqual([]);
      });
      it("'test'.split(/(?:)/, NaN) results in []", () => {
        expect('test'.split(/(?:)/, NaN)).toEqual([]);
      });
      it("'test'.split(/(?:)/, true) results in ['t']", () => {
        expect('test'.split(/(?:)/, true)).toEqual(['t']);
      });
      it("'test'.split(/(?:)/, '2') results in ['t', 'e']", () => {
        expect('test'.split(/(?:)/, '2')).toEqual(['t', 'e']);
      });
      it("'test'.split(/(?:)/, 'two') results in []", () => {
        expect('test'.split(/(?:)/, 'two')).toEqual([]);
      });
      it("'a'.split(/-/) results in ['a']", () => {
        expect('a'.split(/-/)).toEqual(['a']);
      });
      it("'a'.split(/-?/) results in ['a']", () => {
        expect('a'.split(/-?/)).toEqual(['a']);
      });
      it("'a'.split(/-??/) results in ['a']", () => {
        expect('a'.split(/-??/)).toEqual(['a']);
      });
      it("'a'.split(/a/) results in ['', '']", () => {
        expect('a'.split(/a/)).toEqual(['', '']);
      });
      it("'a'.split(/a?/) results in ['', '']", () => {
        expect('a'.split(/a?/)).toEqual(['', '']);
      });
      it("'a'.split(/a??/) results in ['a']", () => {
        expect('a'.split(/a??/)).toEqual(['a']);
      });
      it("'ab'.split(/-/) results in ['ab']", () => {
        expect('ab'.split(/-/)).toEqual(['ab']);
      });
      it("'ab'.split(/-?/) results in ['a', 'b']", () => {
        expect('ab'.split(/-?/)).toEqual(['a', 'b']);
      });
      it("'ab'.split(/-??/) results in ['a', 'b']", () => {
        expect('ab'.split(/-??/)).toEqual(['a', 'b']);
      });
      it("'a-b'.split(/-/) results in ['a', 'b']", () => {
        expect('a-b'.split(/-/)).toEqual(['a', 'b']);
      });
      it("'a-b'.split(/-?/) results in ['a', 'b']", () => {
        expect('a-b'.split(/-?/)).toEqual(['a', 'b']);
      });
      it("'a-b'.split(/-??/) results in ['a', '-', 'b']", () => {
        expect('a-b'.split(/-??/)).toEqual(['a', '-', 'b']);
      });
      it("'a--b'.split(/-/) results in ['a', '', 'b']", () => {
        expect('a--b'.split(/-/)).toEqual(['a', '', 'b']);
      });
      it("'a--b'.split(/-?/) results in ['a', '', 'b']", () => {
        expect('a--b'.split(/-?/)).toEqual(['a', '', 'b']);
      });
      it("'a--b'.split(/-??/) results in ['a', '-', '-', 'b']", () => {
        expect('a--b'.split(/-??/)).toEqual(['a', '-', '-', 'b']);
      });
      it("''.split(/()()/) results in []", () => {
        expect(''.split(/()()/)).toEqual([]);
      });
      it("'.'.split(/()()/) results in ['.']", () => {
        expect('.'.split(/()()/)).toEqual(['.']);
      });
      it("'.'.split(/(.?)(.?)/) results in ['', '.', '', '']", () => {
        expect('.'.split(/(.?)(.?)/)).toEqual(['', '.', '', '']);
      });
      it("'.'.split(/(.??)(.??)/) results in ['.']", () => {
        expect('.'.split(/(.??)(.??)/)).toEqual(['.']);
      });
      it("'.'.split(/(.)?(.)?/) results in ['', '.', undefined, '']", () => {
        expect('.'.split(/(.)?(.)?/)).toEqual(['', '.', undefined, '']);
      });
      it("'A<B>bold</B>and<CODE>coded</CODE>'.split(/<(\\/)?([^<>]+)>/) results in ['A', undefined, 'B', 'bold', '/', 'B', 'and', undefined, 'CODE', 'coded', '/', 'CODE', '']", () => {
        expect('A<B>bold</B>and<CODE>coded</CODE>'.split(/<(\/)?([^<>]+)>/)).toEqual(['A', undefined, 'B', 'bold', '/', 'B', 'and', undefined, 'CODE', 'coded', '/', 'CODE', '']);
      });
      it("'tesst'.split(/(s)*/) results in ['t', undefined, 'e', 's', 't']", () => {
        expect('tesst'.split(/(s)*/)).toEqual(['t', undefined, 'e', 's', 't']);
      });
      it("'tesst'.split(/(s)*?/) results in ['t', undefined, 'e', undefined, 's', undefined, 's', undefined, 't']", () => {
        expect('tesst'.split(/(s)*?/)).toEqual(['t', undefined, 'e', undefined, 's', undefined, 's', undefined, 't']);
      });
      it("'tesst'.split(/(s*)/) results in ['t', '', 'e', 'ss', 't']", () => {
        expect('tesst'.split(/(s*)/)).toEqual(['t', '', 'e', 'ss', 't']);
      });
      it("'tesst'.split(/(s*?)/) results in ['t', '', 'e', '', 's', '', 's', '', 't']", () => {
        expect('tesst'.split(/(s*?)/)).toEqual(['t', '', 'e', '', 's', '', 's', '', 't']);
      });
      it("'tesst'.split(/(?:s)*/) results in ['t', 'e', 't']", () => {
        expect('tesst'.split(/(?:s)*/)).toEqual(['t', 'e', 't']);
      });
      it("'tesst'.split(/(?=s+)/) results in ['te', 's', 'st']", () => {
        expect('tesst'.split(/(?=s+)/)).toEqual(['te', 's', 'st']);
      });
      it("'test'.split('t') results in ['', 'es', '']", () => {
        expect('test'.split('t')).toEqual(['', 'es', '']);
      });
      it("'test'.split('es') results in ['t', 't']", () => {
        expect('test'.split('es')).toEqual(['t', 't']);
      });
      it("'test'.split(/t/) results in ['', 'es', '']", () => {
        expect('test'.split(/t/)).toEqual(['', 'es', '']);
      });
      it("'test'.split(/es/) results in ['t', 't']", () => {
        expect('test'.split(/es/)).toEqual(['t', 't']);
      });
      it("'test'.split(/(t)/) results in ['', 't', 'es', 't', '']", () => {
        expect('test'.split(/(t)/)).toEqual(['', 't', 'es', 't', '']);
      });
      it("'test'.split(/(es)/) results in ['t', 'es', 't']", () => {
        expect('test'.split(/(es)/)).toEqual(['t', 'es', 't']);
      });
      it("'test'.split(/(t)(e)(s)(t)/) results in ['', 't', 'e', 's', 't', '']", () => {
        expect('test'.split(/(t)(e)(s)(t)/)).toEqual(['', 't', 'e', 's', 't', '']);
      });
      it("'.'.split(/(((.((.??)))))/) results in ['', '.', '.', '.', '', '', '']", () => {
        expect('.'.split(/(((.((.??)))))/)).toEqual(['', '.', '.', '.', '', '', '']);
      });
      it("'.'.split(/(((((.??)))))/) results in ['.']", () => {
        expect('.'.split(/(((((.??)))))/)).toEqual(['.']);
      });
      it("'a b c d'.split(/ /, -(Math.pow(2, 32) - 1)) results in ['a']", () => {
        expect('a b c d'.split(/ /, -(Math.pow(2, 32) - 1))).toEqual(['a']);
      });
      it("'a b c d'.split(/ /, Math.pow(2, 32) + 1) results in ['a']", () => {
        expect('a b c d'.split(/ /, Math.pow(2, 32) + 1)).toEqual(['a']);
      });
      it("'a b c d'.split(/ /, Infinity) results in []", () => {
        expect('a b c d'.split(/ /, Infinity)).toEqual([]);
      });
    });
  });
});
