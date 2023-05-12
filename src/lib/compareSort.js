/**
 * hwh
 * 排序方法合集
 */
export default {
    methods: {
        /**
         * hwh
         * 井号排序方法 （处理中文 字母 数字 混合序排列 ）
         * @param a 井名a
         * @param b 井名b
         * @returns {number} 返回 -1 、 1 来确定排序顺序
         */
        wellNoSort(a, b) {
            let i = 0, j = 0;
            while (i < a.length && j < b.length) {
                if (isNaN(a.charAt(i)) && isNaN(b.charAt(j))) {
                    let ca = a.charAt(i);
                    let cb = b.charAt(j);
                    if (ca < cb) {
                        return -1;
                    } else if (ca > cb) {
                        return 1;
                    } else {
                        i++;
                        j++;
                    }
                } else if (!isNaN(a.charAt(i)) && !isNaN(b.charAt(j))) {
                    let i1 = 0;
                    let j1 = 0;
                    let ca = '';
                    let cb = '';
                    while ((i + i1) < a.length && !isNaN(a.charAt(i + i1))) {
                        ca = ca + a.charAt(i + i1);
                        i1++;
                    }
                    i = i + i1;
                    while ((j + j1) < b.length && !isNaN(b.charAt(j + j1))) {
                        cb = cb + b.charAt(j + j1);
                        j1++;
                    }
                    j = j + j1;
                    if (Number(ca) < Number(cb)) {
                        return -1;
                    } else if (Number(ca) > Number(cb)) {
                        return 1;
                    }
                } else if (!isNaN(a.charAt(i)) && isNaN(b.charAt(j))) {
                    return -1;
                } else if (isNaN(a.charAt(i)) && !isNaN(b.charAt(j))) {
                    return 1;
                }
            }
            return a.length < b.length ? -1 : 1;
        }
    }
}