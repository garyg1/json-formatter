/**
 * @license
 * Copyright © 2024 Gary Gurlaskie
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software 
 * and associated documentation files (the “Software”), to deal in the Software without restriction,
 * including without limitation the rights to use, copy, modify, merge, publish, distribute,
 * sublicense, and/or sell copies of the Software, and to permit persons to whom the Software
 * is furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all copies or
 * substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING
 * BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
 * DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

const ARRAY_SEP = ", ";
const OBJ_KV_SEP = ": ";

/**
 * 
 * @param {any} o 
 * @returns {o is any[]}
 */
function isArray(o) {
    return Array.isArray(o);
}

/**
 * @param {any} o 
 * @returns {o is Object<string, any>}
 */
function isObject(o) {
    // https://stackoverflow.com/questions/8511281/check-if-a-value-is-an-object-in-javascript
    return typeof o === 'object' && o !== null;
}

/** @param {number[]} arr */
function sumArray(arr) {
    return arr.reduce((s, e) => s + e, 0)
}

/**
 * @param {any} object 
 * @param {number} indent 
 * @param {number} lineLength 
 * @returns {string}
 */
function prettifyJson(object, indent, lineLength) {
    const singleLineLengths = {};
    function getSLLength(o) {
        let ans = 0;
        if (isArray(o)) {
            ans = o
                .map(e => getSLLength(e))
                .reduce((s, len) => s + len + ARRAY_SEP.length, 0);
            ans += "[]".length;
            if (o.length > 0) {
                ans -= ARRAY_SEP.length;
            }
        }
        else if (isObject(o)) {
            ans = Object.entries(o)
                .map((kv) => JSON.stringify(kv[0]).length + OBJ_KV_SEP.length + getSLLength(kv[1]))
                .reduce((s, len) => s + len + ARRAY_SEP.length, 0);
        }
        else {
            ans = JSON.stringify(o).length;
        }

        singleLineLengths[o] = ans;
        return ans;
    }

    // precompute
    getSLLength(object);


    function getPrettyRepresentation(o, currIndent, nextIndent, forceSingleLine) {
        const currSLWidth = lineLength - currIndent;
        const nextLWidth = lineLength - nextIndent;
        if (isArray(o)) {
            if (getSLLength(o) < currSLWidth || forceSingleLine) {
                return "[" + o.map(e => getPrettyRepresentation(e, 0, 0, true)).join(ARRAY_SEP) + "]";
            }
            else if (getSLLength(o) + indent < nextLWidth) {
                return "[\n"
                    + " ".repeat(nextIndent + indent) + o.map(e => getPrettyRepresentation(e, 0, 0, true)).join(ARRAY_SEP) + "\n"
                    + " ".repeat(nextIndent) + "]";
            }
            else {
                const ans = ["[\n"];
                for (const e of o) {
                    ans.push(" ".repeat(nextIndent + indent));
                    ans.push(getPrettyRepresentation(e, nextIndent + indent, nextIndent + indent));
                    ans.push(ARRAY_SEP);
                    ans.push("\n");
                }

                ans.pop();
                ans.pop();
                ans.push("\n");

                ans.push(" ".repeat(nextIndent));
                ans.push("]");
                return ans.join("");
            }
        }
        else if (isObject(o)) {
            if (getSLLength(o) < currSLWidth || forceSingleLine) {
                return "{" + Object.entries(o)
                    .map((kvp) => [
                        getPrettyRepresentation(kvp[0], 0, 0, true),
                        OBJ_KV_SEP,
                        getPrettyRepresentation(kvp[1], 0, 0, true),
                    ].join(""))
                    .join(ARRAY_SEP) + "}";
            }
            else {
                const ans = ["{\n"];
                for (const [k, v] of Object.entries(o)) {
                    ans.push(" ".repeat(nextIndent + indent));
                    ans.push(JSON.stringify(k));
                    ans.push(OBJ_KV_SEP);
                    ans.push(getPrettyRepresentation(v, nextIndent + indent + JSON.stringify(k).length + ARRAY_SEP.length, nextIndent + indent));
                    ans.push(ARRAY_SEP);
                    ans.push("\n");
                }
                ans.pop();
                ans.pop();
                ans.push("\n");

                ans.push(" ".repeat(nextIndent));
                ans.push("}");
                return ans.join("");
            }
        }
        else {
            return JSON.stringify(o);
        }
    }

    return getPrettyRepresentation(object, 0, 0);
}

function test() {
    for (let i = 60; i >= 10; i--) {
        console.log('-'.repeat(i));
        console.log(prettifyJson([1, 2, 3, [4, 5, [6, 7, 8]], "9"], 4, i));
    }

    for (let i = 100; i >= 10; i -= 2) {
        console.log('-'.repeat(i));
        console.log(prettifyJson({ "the quick brown fox": { "jumps": "over", "the lazy": ["d", "o", "g"] } }, 4, i));
    }
}