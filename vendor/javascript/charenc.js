var n={};var t={utf8:{stringToBytes:function(n){return t.bin.stringToBytes(unescape(encodeURIComponent(n)))},bytesToString:function(n){return decodeURIComponent(escape(t.bin.bytesToString(n)))}},bin:{stringToBytes:function(n){for(var t=[],e=0;e<n.length;e++)t.push(255&n.charCodeAt(e));return t},bytesToString:function(n){for(var t=[],e=0;e<n.length;e++)t.push(String.fromCharCode(n[e]));return t.join("")}}};n=t;var e=n;export default e;
