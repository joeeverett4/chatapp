(function() {
  "use strict";
  const $modelRelationships = Symbol.for("gadget/modelRelationships");
  const $coreImplementation = Symbol.for("gadget/coreImplementation");
  var ChangeTracking;
  (function(ChangeTracking2) {
    ChangeTracking2[ChangeTracking2["SinceLoaded"] = 0] = "SinceLoaded";
    ChangeTracking2[ChangeTracking2["SinceLastPersisted"] = 1] = "SinceLastPersisted";
  })(ChangeTracking || (ChangeTracking = {}));
  var AuthenticationMode = /* @__PURE__ */ ((AuthenticationMode2) => {
    AuthenticationMode2["BrowserSession"] = "browser-session";
    AuthenticationMode2["APIKey"] = "api-key";
    AuthenticationMode2["Internal"] = "internal";
    AuthenticationMode2["InternalAuthToken"] = "internal-auth-token";
    AuthenticationMode2["Anonymous"] = "anonymous";
    AuthenticationMode2["Custom"] = "custom";
    return AuthenticationMode2;
  })(AuthenticationMode || {});
  var BrowserSessionStorageType = /* @__PURE__ */ ((BrowserSessionStorageType2) => {
    BrowserSessionStorageType2["Durable"] = "Durable";
    BrowserSessionStorageType2["Session"] = "session";
    BrowserSessionStorageType2["Temporary"] = "temporary";
    return BrowserSessionStorageType2;
  })(BrowserSessionStorageType || {});
  var e$1 = {
    NAME: "Name",
    OPERATION_DEFINITION: "OperationDefinition",
    FIELD: "Field"
  };
  class GraphQLError extends Error {
    constructor(e2, r2, i2, n2, t2, a2, o2) {
      if (super(e2), this.name = "GraphQLError", this.message = e2, t2) {
        this.path = t2;
      }
      if (r2) {
        this.nodes = Array.isArray(r2) ? r2 : [r2];
      }
      if (i2) {
        this.source = i2;
      }
      if (n2) {
        this.positions = n2;
      }
      if (a2) {
        this.originalError = a2;
      }
      var l2 = o2;
      if (!l2 && a2) {
        var d2 = a2.extensions;
        if (d2 && "object" == typeof d2) {
          l2 = d2;
        }
      }
      this.extensions = l2 || {};
    }
    toJSON() {
      return {
        ...this,
        message: this.message
      };
    }
    toString() {
      return this.message;
    }
    get [Symbol.toStringTag]() {
      return "GraphQLError";
    }
  }
  var i$1;
  var n;
  function error(e2) {
    return new GraphQLError(`Syntax Error: Unexpected token at ${n} in ${e2}`);
  }
  function advance(e2) {
    if (e2.lastIndex = n, e2.test(i$1)) {
      return i$1.slice(n, n = e2.lastIndex);
    }
  }
  var t$1 = / +(?=[^\s])/y;
  function blockString(e2) {
    var r2 = e2.split("\n");
    var i2 = "";
    var n2 = 0;
    var a2 = 0;
    var o2 = r2.length - 1;
    for (var l2 = 0; l2 < r2.length; l2++) {
      if (t$1.lastIndex = 0, t$1.test(r2[l2])) {
        if (l2 && (!n2 || t$1.lastIndex < n2)) {
          n2 = t$1.lastIndex;
        }
        a2 = a2 || l2, o2 = l2;
      }
    }
    for (var d2 = a2; d2 <= o2; d2++) {
      if (d2 !== a2) {
        i2 += "\n";
      }
      i2 += r2[d2].slice(n2).replace(/\\"""/g, '"""');
    }
    return i2;
  }
  function ignored() {
    for (var e2 = 0 | i$1.charCodeAt(n++); 9 === e2 || 10 === e2 || 13 === e2 || 32 === e2 || 35 === e2 || 44 === e2 || 65279 === e2; e2 = 0 | i$1.charCodeAt(n++)) {
      if (35 === e2) {
        for (; (e2 = 0 | i$1.charCodeAt(n++)) && 10 !== e2 && 13 !== e2; ) {
        }
      }
    }
    n--;
  }
  function name() {
    var e2 = n;
    for (var r2 = 0 | i$1.charCodeAt(n++); r2 >= 48 && r2 <= 57 || r2 >= 65 && r2 <= 90 || 95 === r2 || r2 >= 97 && r2 <= 122; r2 = 0 | i$1.charCodeAt(n++)) {
    }
    if (e2 === n - 1) {
      throw error("Name");
    }
    var t2 = i$1.slice(e2, --n);
    return ignored(), t2;
  }
  function nameNode() {
    return {
      kind: "Name",
      value: name()
    };
  }
  var a = /(?:"""|(?:[\s\S]*?[^\\])""")/y;
  var o = /(?:(?:\.\d+)?[eE][+-]?\d+|\.\d+)/y;
  function value(e2) {
    var r2;
    switch (i$1.charCodeAt(n)) {
      case 91:
        n++, ignored();
        var t2 = [];
        for (; 93 !== i$1.charCodeAt(n); ) {
          t2.push(value(e2));
        }
        return n++, ignored(), {
          kind: "ListValue",
          values: t2
        };
      case 123:
        n++, ignored();
        var l2 = [];
        for (; 125 !== i$1.charCodeAt(n); ) {
          var d2 = nameNode();
          if (58 !== i$1.charCodeAt(n++)) {
            throw error("ObjectField");
          }
          ignored(), l2.push({
            kind: "ObjectField",
            name: d2,
            value: value(e2)
          });
        }
        return n++, ignored(), {
          kind: "ObjectValue",
          fields: l2
        };
      case 36:
        if (e2) {
          throw error("Variable");
        }
        return n++, {
          kind: "Variable",
          name: nameNode()
        };
      case 34:
        if (34 === i$1.charCodeAt(n + 1) && 34 === i$1.charCodeAt(n + 2)) {
          if (n += 3, null == (r2 = advance(a))) {
            throw error("StringValue");
          }
          return ignored(), {
            kind: "StringValue",
            value: blockString(r2.slice(0, -3)),
            block: true
          };
        } else {
          var u2 = n;
          var s;
          n++;
          var c2 = false;
          for (s = 0 | i$1.charCodeAt(n++); 92 === s && (n++, c2 = true) || 10 !== s && 13 !== s && 34 !== s && s; s = 0 | i$1.charCodeAt(n++)) {
          }
          if (34 !== s) {
            throw error("StringValue");
          }
          return r2 = i$1.slice(u2, n), ignored(), {
            kind: "StringValue",
            value: c2 ? JSON.parse(r2) : r2.slice(1, -1),
            block: false
          };
        }
      case 45:
      case 48:
      case 49:
      case 50:
      case 51:
      case 52:
      case 53:
      case 54:
      case 55:
      case 56:
      case 57:
        var v2 = n++;
        var f2;
        for (; (f2 = 0 | i$1.charCodeAt(n++)) >= 48 && f2 <= 57; ) {
        }
        var m = i$1.slice(v2, --n);
        if (46 === (f2 = i$1.charCodeAt(n)) || 69 === f2 || 101 === f2) {
          if (null == (r2 = advance(o))) {
            throw error("FloatValue");
          }
          return ignored(), {
            kind: "FloatValue",
            value: m + r2
          };
        } else {
          return ignored(), {
            kind: "IntValue",
            value: m
          };
        }
      case 110:
        if (117 === i$1.charCodeAt(n + 1) && 108 === i$1.charCodeAt(n + 2) && 108 === i$1.charCodeAt(n + 3)) {
          return n += 4, ignored(), {
            kind: "NullValue"
          };
        } else {
          break;
        }
      case 116:
        if (114 === i$1.charCodeAt(n + 1) && 117 === i$1.charCodeAt(n + 2) && 101 === i$1.charCodeAt(n + 3)) {
          return n += 4, ignored(), {
            kind: "BooleanValue",
            value: true
          };
        } else {
          break;
        }
      case 102:
        if (97 === i$1.charCodeAt(n + 1) && 108 === i$1.charCodeAt(n + 2) && 115 === i$1.charCodeAt(n + 3) && 101 === i$1.charCodeAt(n + 4)) {
          return n += 5, ignored(), {
            kind: "BooleanValue",
            value: false
          };
        } else {
          break;
        }
    }
    return {
      kind: "EnumValue",
      value: name()
    };
  }
  function arguments_(e2) {
    if (40 === i$1.charCodeAt(n)) {
      var r2 = [];
      n++, ignored();
      do {
        var t2 = nameNode();
        if (58 !== i$1.charCodeAt(n++)) {
          throw error("Argument");
        }
        ignored(), r2.push({
          kind: "Argument",
          name: t2,
          value: value(e2)
        });
      } while (41 !== i$1.charCodeAt(n));
      return n++, ignored(), r2;
    }
  }
  function directives(e2) {
    if (64 === i$1.charCodeAt(n)) {
      var r2 = [];
      do {
        n++, r2.push({
          kind: "Directive",
          name: nameNode(),
          arguments: arguments_(e2)
        });
      } while (64 === i$1.charCodeAt(n));
      return r2;
    }
  }
  function type() {
    var e2 = 0;
    for (; 91 === i$1.charCodeAt(n); ) {
      e2++, n++, ignored();
    }
    var r2 = {
      kind: "NamedType",
      name: nameNode()
    };
    do {
      if (33 === i$1.charCodeAt(n)) {
        n++, ignored(), r2 = {
          kind: "NonNullType",
          type: r2
        };
      }
      if (e2) {
        if (93 !== i$1.charCodeAt(n++)) {
          throw error("NamedType");
        }
        ignored(), r2 = {
          kind: "ListType",
          type: r2
        };
      }
    } while (e2--);
    return r2;
  }
  function selectionSetStart() {
    if (123 !== i$1.charCodeAt(n++)) {
      throw error("SelectionSet");
    }
    return ignored(), selectionSet();
  }
  function selectionSet() {
    var e2 = [];
    do {
      if (46 === i$1.charCodeAt(n)) {
        if (46 !== i$1.charCodeAt(++n) || 46 !== i$1.charCodeAt(++n)) {
          throw error("SelectionSet");
        }
        switch (n++, ignored(), i$1.charCodeAt(n)) {
          case 64:
            e2.push({
              kind: "InlineFragment",
              typeCondition: void 0,
              directives: directives(false),
              selectionSet: selectionSetStart()
            });
            break;
          case 111:
            if (110 === i$1.charCodeAt(n + 1)) {
              n += 2, ignored(), e2.push({
                kind: "InlineFragment",
                typeCondition: {
                  kind: "NamedType",
                  name: nameNode()
                },
                directives: directives(false),
                selectionSet: selectionSetStart()
              });
            } else {
              e2.push({
                kind: "FragmentSpread",
                name: nameNode(),
                directives: directives(false)
              });
            }
            break;
          case 123:
            n++, ignored(), e2.push({
              kind: "InlineFragment",
              typeCondition: void 0,
              directives: void 0,
              selectionSet: selectionSet()
            });
            break;
          default:
            e2.push({
              kind: "FragmentSpread",
              name: nameNode(),
              directives: directives(false)
            });
        }
      } else {
        var r2 = nameNode();
        var t2 = void 0;
        if (58 === i$1.charCodeAt(n)) {
          n++, ignored(), t2 = r2, r2 = nameNode();
        }
        var a2 = arguments_(false);
        var o2 = directives(false);
        var l2 = void 0;
        if (123 === i$1.charCodeAt(n)) {
          n++, ignored(), l2 = selectionSet();
        }
        e2.push({
          kind: "Field",
          alias: t2,
          name: r2,
          arguments: a2,
          directives: o2,
          selectionSet: l2
        });
      }
    } while (125 !== i$1.charCodeAt(n));
    return n++, ignored(), {
      kind: "SelectionSet",
      selections: e2
    };
  }
  function variableDefinitions() {
    if (ignored(), 40 === i$1.charCodeAt(n)) {
      var e2 = [];
      n++, ignored();
      do {
        var r2 = void 0;
        if (34 === i$1.charCodeAt(n)) {
          r2 = value(true);
        }
        if (36 !== i$1.charCodeAt(n++)) {
          throw error("Variable");
        }
        var t2 = nameNode();
        if (58 !== i$1.charCodeAt(n++)) {
          throw error("VariableDefinition");
        }
        ignored();
        var a2 = type();
        var o2 = void 0;
        if (61 === i$1.charCodeAt(n)) {
          n++, ignored(), o2 = value(true);
        }
        ignored();
        var l2 = {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: t2
          },
          type: a2,
          defaultValue: o2,
          directives: directives(true)
        };
        if (r2) {
          l2.description = r2;
        }
        e2.push(l2);
      } while (41 !== i$1.charCodeAt(n));
      return n++, ignored(), e2;
    }
  }
  function fragmentDefinition(e2) {
    var r2 = nameNode();
    if (111 !== i$1.charCodeAt(n++) || 110 !== i$1.charCodeAt(n++)) {
      throw error("FragmentDefinition");
    }
    ignored();
    var t2 = {
      kind: "FragmentDefinition",
      name: r2,
      typeCondition: {
        kind: "NamedType",
        name: nameNode()
      },
      directives: directives(false),
      selectionSet: selectionSetStart()
    };
    if (e2) {
      t2.description = e2;
    }
    return t2;
  }
  function definitions() {
    var e2 = [];
    do {
      var r2 = void 0;
      if (34 === i$1.charCodeAt(n)) {
        r2 = value(true);
      }
      if (123 === i$1.charCodeAt(n)) {
        if (r2) {
          throw error("Document");
        }
        n++, ignored(), e2.push({
          kind: "OperationDefinition",
          operation: "query",
          name: void 0,
          variableDefinitions: void 0,
          directives: void 0,
          selectionSet: selectionSet()
        });
      } else {
        var t2 = name();
        switch (t2) {
          case "fragment":
            e2.push(fragmentDefinition(r2));
            break;
          case "query":
          case "mutation":
          case "subscription":
            var a2;
            var o2 = void 0;
            if (40 !== (a2 = i$1.charCodeAt(n)) && 64 !== a2 && 123 !== a2) {
              o2 = nameNode();
            }
            var l2 = {
              kind: "OperationDefinition",
              operation: t2,
              name: o2,
              variableDefinitions: variableDefinitions(),
              directives: directives(false),
              selectionSet: selectionSetStart()
            };
            if (r2) {
              l2.description = r2;
            }
            e2.push(l2);
            break;
          default:
            throw error("Document");
        }
      }
    } while (n < i$1.length);
    return e2;
  }
  function parse(e2, r2) {
    if (i$1 = e2.body ? e2.body : e2, n = 0, ignored(), r2 && r2.noLocation) {
      return {
        kind: "Document",
        definitions: definitions()
      };
    } else {
      return {
        kind: "Document",
        definitions: definitions(),
        loc: {
          start: 0,
          end: i$1.length,
          startToken: void 0,
          endToken: void 0,
          source: {
            body: i$1,
            name: "graphql.web",
            locationOffset: {
              line: 1,
              column: 1
            }
          }
        }
      };
    }
  }
  function mapJoin(e2, r2, i2) {
    var n2 = "";
    for (var t2 = 0; t2 < e2.length; t2++) {
      if (t2) {
        n2 += r2;
      }
      n2 += i2(e2[t2]);
    }
    return n2;
  }
  function printString(e2) {
    return JSON.stringify(e2);
  }
  function printBlockString(e2) {
    return '"""\n' + e2.replace(/"""/g, '\\"""') + '\n"""';
  }
  var d$1 = "\n";
  var u$1 = {
    OperationDefinition(e2) {
      var r2 = "";
      if (e2.description) {
        r2 += u$1.StringValue(e2.description) + "\n";
      }
      if (r2 += e2.operation, e2.name) {
        r2 += " " + e2.name.value;
      }
      if (e2.variableDefinitions && e2.variableDefinitions.length) {
        if (!e2.name) {
          r2 += " ";
        }
        r2 += "(" + mapJoin(e2.variableDefinitions, ", ", u$1.VariableDefinition) + ")";
      }
      if (e2.directives && e2.directives.length) {
        r2 += " " + mapJoin(e2.directives, " ", u$1.Directive);
      }
      var i2 = u$1.SelectionSet(e2.selectionSet);
      return "query" !== r2 ? r2 + " " + i2 : i2;
    },
    VariableDefinition(e2) {
      var r2 = "";
      if (e2.description) {
        r2 += u$1.StringValue(e2.description) + " ";
      }
      if (r2 += u$1.Variable(e2.variable) + ": " + _print(e2.type), e2.defaultValue) {
        r2 += " = " + _print(e2.defaultValue);
      }
      if (e2.directives && e2.directives.length) {
        r2 += " " + mapJoin(e2.directives, " ", u$1.Directive);
      }
      return r2;
    },
    Field(e2) {
      var r2 = e2.alias ? e2.alias.value + ": " + e2.name.value : e2.name.value;
      if (e2.arguments && e2.arguments.length) {
        var i2 = mapJoin(e2.arguments, ", ", u$1.Argument);
        if (r2.length + i2.length + 2 > 80) {
          r2 += "(" + (d$1 += "  ") + mapJoin(e2.arguments, d$1, u$1.Argument) + (d$1 = d$1.slice(0, -2)) + ")";
        } else {
          r2 += "(" + i2 + ")";
        }
      }
      if (e2.directives && e2.directives.length) {
        r2 += " " + mapJoin(e2.directives, " ", u$1.Directive);
      }
      if (e2.selectionSet && e2.selectionSet.selections.length) {
        r2 += " " + u$1.SelectionSet(e2.selectionSet);
      }
      return r2;
    },
    StringValue(e2) {
      if (e2.block) {
        return printBlockString(e2.value).replace(/\n/g, d$1);
      } else {
        return printString(e2.value);
      }
    },
    BooleanValue: (e2) => "" + e2.value,
    NullValue: (e2) => "null",
    IntValue: (e2) => e2.value,
    FloatValue: (e2) => e2.value,
    EnumValue: (e2) => e2.value,
    Name: (e2) => e2.value,
    Variable: (e2) => "$" + e2.name.value,
    ListValue: (e2) => "[" + mapJoin(e2.values, ", ", _print) + "]",
    ObjectValue: (e2) => "{" + mapJoin(e2.fields, ", ", u$1.ObjectField) + "}",
    ObjectField: (e2) => e2.name.value + ": " + _print(e2.value),
    Document(e2) {
      if (!e2.definitions || !e2.definitions.length) {
        return "";
      } else {
        return mapJoin(e2.definitions, "\n\n", _print);
      }
    },
    SelectionSet: (e2) => "{" + (d$1 += "  ") + mapJoin(e2.selections, d$1, _print) + (d$1 = d$1.slice(0, -2)) + "}",
    Argument: (e2) => e2.name.value + ": " + _print(e2.value),
    FragmentSpread(e2) {
      var r2 = "..." + e2.name.value;
      if (e2.directives && e2.directives.length) {
        r2 += " " + mapJoin(e2.directives, " ", u$1.Directive);
      }
      return r2;
    },
    InlineFragment(e2) {
      var r2 = "...";
      if (e2.typeCondition) {
        r2 += " on " + e2.typeCondition.name.value;
      }
      if (e2.directives && e2.directives.length) {
        r2 += " " + mapJoin(e2.directives, " ", u$1.Directive);
      }
      return r2 += " " + u$1.SelectionSet(e2.selectionSet);
    },
    FragmentDefinition(e2) {
      var r2 = "";
      if (e2.description) {
        r2 += u$1.StringValue(e2.description) + "\n";
      }
      if (r2 += "fragment " + e2.name.value, r2 += " on " + e2.typeCondition.name.value, e2.directives && e2.directives.length) {
        r2 += " " + mapJoin(e2.directives, " ", u$1.Directive);
      }
      return r2 + " " + u$1.SelectionSet(e2.selectionSet);
    },
    Directive(e2) {
      var r2 = "@" + e2.name.value;
      if (e2.arguments && e2.arguments.length) {
        r2 += "(" + mapJoin(e2.arguments, ", ", u$1.Argument) + ")";
      }
      return r2;
    },
    NamedType: (e2) => e2.name.value,
    ListType: (e2) => "[" + _print(e2.type) + "]",
    NonNullType: (e2) => _print(e2.type) + "!"
  };
  var _print = (e2) => u$1[e2.kind](e2);
  function print(e2) {
    return d$1 = "\n", u$1[e2.kind] ? u$1[e2.kind](e2) : "";
  }
  var teardownPlaceholder = () => {
  };
  var e = teardownPlaceholder;
  function start(e2) {
    return {
      tag: 0,
      0: e2
    };
  }
  function push$1(e2) {
    return {
      tag: 1,
      0: e2
    };
  }
  var asyncIteratorSymbol = () => "function" == typeof Symbol && Symbol.asyncIterator || "@@asyncIterator";
  var identity = (e2) => e2;
  function filter(r2) {
    return (t2) => (i2) => {
      var a2 = e;
      t2((e2) => {
        if (0 === e2) {
          i2(0);
        } else if (0 === e2.tag) {
          a2 = e2[0];
          i2(e2);
        } else if (!r2(e2[0])) {
          a2(0);
        } else {
          i2(e2);
        }
      });
    };
  }
  function map(e2) {
    return (r2) => (t2) => r2((r3) => {
      if (0 === r3 || 0 === r3.tag) {
        t2(r3);
      } else {
        t2(push$1(e2(r3[0])));
      }
    });
  }
  function mergeMap(r2) {
    return (t2) => (i2) => {
      var a2 = [];
      var f2 = e;
      var n2 = false;
      var s = false;
      t2((t3) => {
        if (s) ;
        else if (0 === t3) {
          s = true;
          if (!a2.length) {
            i2(0);
          }
        } else if (0 === t3.tag) {
          f2 = t3[0];
        } else {
          n2 = false;
          !function applyInnerSource(r3) {
            var t4 = e;
            r3((e2) => {
              if (0 === e2) {
                if (a2.length) {
                  var r4 = a2.indexOf(t4);
                  if (r4 > -1) {
                    (a2 = a2.slice()).splice(r4, 1);
                  }
                  if (!a2.length) {
                    if (s) {
                      i2(0);
                    } else if (!n2) {
                      n2 = true;
                      f2(0);
                    }
                  }
                }
              } else if (0 === e2.tag) {
                a2.push(t4 = e2[0]);
                t4(0);
              } else if (a2.length) {
                i2(e2);
                t4(0);
              }
            });
          }(r2(t3[0]));
          if (!n2) {
            n2 = true;
            f2(0);
          }
        }
      });
      i2(start((e2) => {
        if (1 === e2) {
          if (!s) {
            s = true;
            f2(1);
          }
          for (var r3 = 0, t3 = a2, i3 = a2.length; r3 < i3; r3++) {
            t3[r3](1);
          }
          a2.length = 0;
        } else {
          if (!s && !n2) {
            n2 = true;
            f2(0);
          } else {
            n2 = false;
          }
          for (var l2 = 0, u2 = a2, o2 = a2.length; l2 < o2; l2++) {
            u2[l2](0);
          }
        }
      }));
    };
  }
  function mergeAll(e2) {
    return mergeMap(identity)(e2);
  }
  function merge(e2) {
    return mergeAll(r(e2));
  }
  function onEnd(e2) {
    return (r2) => (t2) => {
      var i2 = false;
      r2((r3) => {
        if (i2) ;
        else if (0 === r3) {
          i2 = true;
          t2(0);
          e2();
        } else if (0 === r3.tag) {
          var a2 = r3[0];
          t2(start((r4) => {
            if (1 === r4) {
              i2 = true;
              a2(1);
              e2();
            } else {
              a2(r4);
            }
          }));
        } else {
          t2(r3);
        }
      });
    };
  }
  function onPush(e2) {
    return (r2) => (t2) => {
      var i2 = false;
      r2((r3) => {
        if (i2) ;
        else if (0 === r3) {
          i2 = true;
          t2(0);
        } else if (0 === r3.tag) {
          var a2 = r3[0];
          t2(start((e3) => {
            if (1 === e3) {
              i2 = true;
            }
            a2(e3);
          }));
        } else {
          e2(r3[0]);
          t2(r3);
        }
      });
    };
  }
  function onStart(e2) {
    return (r2) => (t2) => r2((r3) => {
      if (0 === r3) {
        t2(0);
      } else if (0 === r3.tag) {
        t2(r3);
        e2();
      } else {
        t2(r3);
      }
    });
  }
  function share(r2) {
    var t2 = [];
    var i2 = e;
    var a2 = false;
    return (e2) => {
      t2.push(e2);
      if (1 === t2.length) {
        r2((e3) => {
          if (0 === e3) {
            for (var r3 = 0, f2 = t2, n2 = t2.length; r3 < n2; r3++) {
              f2[r3](0);
            }
            t2.length = 0;
          } else if (0 === e3.tag) {
            i2 = e3[0];
          } else {
            a2 = false;
            for (var s = 0, l2 = t2, u2 = t2.length; s < u2; s++) {
              l2[s](e3);
            }
          }
        });
      }
      e2(start((r3) => {
        if (1 === r3) {
          var f2 = t2.indexOf(e2);
          if (f2 > -1) {
            (t2 = t2.slice()).splice(f2, 1);
          }
          if (!t2.length) {
            i2(1);
          }
        } else if (!a2) {
          a2 = true;
          i2(0);
        }
      }));
    };
  }
  function switchMap(r2) {
    return (t2) => (i2) => {
      var a2 = e;
      var f2 = e;
      var n2 = false;
      var s = false;
      var l2 = false;
      var u2 = false;
      t2((t3) => {
        if (u2) ;
        else if (0 === t3) {
          u2 = true;
          if (!l2) {
            i2(0);
          }
        } else if (0 === t3.tag) {
          a2 = t3[0];
        } else {
          if (l2) {
            f2(1);
            f2 = e;
          }
          if (!n2) {
            n2 = true;
            a2(0);
          } else {
            n2 = false;
          }
          !function applyInnerSource(e2) {
            l2 = true;
            e2((e3) => {
              if (!l2) ;
              else if (0 === e3) {
                l2 = false;
                if (u2) {
                  i2(0);
                } else if (!n2) {
                  n2 = true;
                  a2(0);
                }
              } else if (0 === e3.tag) {
                s = false;
                (f2 = e3[0])(0);
              } else {
                i2(e3);
                if (!s) {
                  f2(0);
                } else {
                  s = false;
                }
              }
            });
          }(r2(t3[0]));
        }
      });
      i2(start((e2) => {
        if (1 === e2) {
          if (!u2) {
            u2 = true;
            a2(1);
          }
          if (l2) {
            l2 = false;
            f2(1);
          }
        } else {
          if (!u2 && !n2) {
            n2 = true;
            a2(0);
          }
          if (l2 && !s) {
            s = true;
            f2(0);
          }
        }
      }));
    };
  }
  function take(r2) {
    return (t2) => (i2) => {
      var a2 = e;
      var f2 = false;
      var n2 = 0;
      t2((e2) => {
        if (f2) ;
        else if (0 === e2) {
          f2 = true;
          i2(0);
        } else if (0 === e2.tag) {
          {
            a2 = e2[0];
          }
        } else if (n2++ < r2) {
          i2(e2);
          if (!f2 && n2 >= r2) {
            f2 = true;
            i2(0);
            a2(1);
          }
        } else {
          i2(e2);
        }
      });
      i2(start((e2) => {
        if (1 === e2 && !f2) {
          f2 = true;
          a2(1);
        } else if (0 === e2 && !f2 && n2 < r2) {
          a2(0);
        }
      }));
    };
  }
  function takeUntil(r2) {
    return (t2) => (i2) => {
      var a2 = e;
      var f2 = e;
      var n2 = false;
      t2((e2) => {
        if (n2) ;
        else if (0 === e2) {
          n2 = true;
          f2(1);
          i2(0);
        } else if (0 === e2.tag) {
          a2 = e2[0];
          r2((e3) => {
            if (0 === e3) ;
            else if (0 === e3.tag) {
              (f2 = e3[0])(0);
            } else {
              n2 = true;
              f2(1);
              a2(1);
              i2(0);
            }
          });
        } else {
          i2(e2);
        }
      });
      i2(start((e2) => {
        if (1 === e2 && !n2) {
          n2 = true;
          a2(1);
          f2(1);
        } else if (!n2) {
          a2(0);
        }
      }));
    };
  }
  function takeWhile(r2, t2) {
    return (i2) => (a2) => {
      var f2 = e;
      var n2 = false;
      i2((e2) => {
        if (n2) ;
        else if (0 === e2) {
          n2 = true;
          a2(0);
        } else if (0 === e2.tag) {
          f2 = e2[0];
          a2(e2);
        } else if (!r2(e2[0])) {
          n2 = true;
          {
            a2(e2);
          }
          a2(0);
          f2(1);
        } else {
          a2(e2);
        }
      });
    };
  }
  function lazy(e2) {
    return (r2) => e2()(r2);
  }
  function fromAsyncIterable(e2) {
    return (r2) => {
      var t2 = e2[asyncIteratorSymbol()] && e2[asyncIteratorSymbol()]() || e2;
      var i2 = false;
      var a2 = false;
      var f2 = false;
      var n2;
      r2(start(async (e3) => {
        if (1 === e3) {
          i2 = true;
          if (t2.return) {
            t2.return();
          }
        } else if (a2) {
          f2 = true;
        } else {
          for (f2 = a2 = true; f2 && !i2; ) {
            if ((n2 = await t2.next()).done) {
              i2 = true;
              if (t2.return) {
                await t2.return();
              }
              r2(0);
            } else {
              try {
                f2 = false;
                r2(push$1(n2.value));
              } catch (e4) {
                if (t2.throw) {
                  if (i2 = !!(await t2.throw(e4)).done) {
                    r2(0);
                  }
                } else {
                  throw e4;
                }
              }
            }
          }
          a2 = false;
        }
      }));
    };
  }
  function fromIterable(e2) {
    if (e2[Symbol.asyncIterator]) {
      return fromAsyncIterable(e2);
    }
    return (r2) => {
      var t2 = e2[Symbol.iterator]();
      var i2 = false;
      var a2 = false;
      var f2 = false;
      var n2;
      r2(start((e3) => {
        if (1 === e3) {
          i2 = true;
          if (t2.return) {
            t2.return();
          }
        } else if (a2) {
          f2 = true;
        } else {
          for (f2 = a2 = true; f2 && !i2; ) {
            if ((n2 = t2.next()).done) {
              i2 = true;
              if (t2.return) {
                t2.return();
              }
              r2(0);
            } else {
              try {
                f2 = false;
                r2(push$1(n2.value));
              } catch (e4) {
                if (t2.throw) {
                  if (i2 = !!t2.throw(e4).done) {
                    r2(0);
                  }
                } else {
                  throw e4;
                }
              }
            }
          }
          a2 = false;
        }
      }));
    };
  }
  var r = fromIterable;
  function fromValue(e2) {
    return (r2) => {
      var t2 = false;
      r2(start((i2) => {
        if (1 === i2) {
          t2 = true;
        } else if (!t2) {
          t2 = true;
          r2(push$1(e2));
          r2(0);
        }
      }));
    };
  }
  function make(e2) {
    return (r2) => {
      var t2 = false;
      var i2 = e2({
        next(e3) {
          if (!t2) {
            r2(push$1(e3));
          }
        },
        complete() {
          if (!t2) {
            t2 = true;
            r2(0);
          }
        }
      });
      r2(start((e3) => {
        if (1 === e3 && !t2) {
          t2 = true;
          i2();
        }
      }));
    };
  }
  function makeSubject() {
    var e2;
    var r2;
    return {
      source: share(make((t2) => {
        e2 = t2.next;
        r2 = t2.complete;
        return teardownPlaceholder;
      })),
      next(r3) {
        if (e2) {
          e2(r3);
        }
      },
      complete() {
        if (r2) {
          r2();
        }
      }
    };
  }
  function fromPromise(e2) {
    return make((r2) => {
      e2.then((e3) => {
        Promise.resolve(e3).then(() => {
          r2.next(e3);
          r2.complete();
        });
      });
      return teardownPlaceholder;
    });
  }
  function subscribe(r2) {
    return (t2) => {
      var i2 = e;
      var a2 = false;
      t2((e2) => {
        if (0 === e2) {
          a2 = true;
        } else if (0 === e2.tag) {
          (i2 = e2[0])(0);
        } else if (!a2) {
          r2(e2[0]);
          i2(0);
        }
      });
      return {
        unsubscribe() {
          if (!a2) {
            a2 = true;
            i2(1);
          }
        }
      };
    };
  }
  function publish(e2) {
    subscribe((e3) => {
    })(e2);
  }
  var t = {
    done: true
  };
  var toAsyncIterable = (r2) => {
    var i2 = [];
    var a2 = false;
    var f2 = false;
    var n2 = false;
    var s = e;
    var l2;
    return {
      async next() {
        if (!f2) {
          f2 = true;
          r2((e2) => {
            if (a2) ;
            else if (0 === e2) {
              if (l2) {
                l2 = l2(t);
              }
              a2 = true;
            } else if (0 === e2.tag) {
              n2 = true;
              (s = e2[0])(0);
            } else {
              n2 = false;
              if (l2) {
                l2 = l2({
                  value: e2[0],
                  done: false
                });
              } else {
                i2.push(e2[0]);
              }
            }
          });
        }
        if (a2 && !i2.length) {
          return t;
        } else if (!a2 && !n2 && i2.length <= 1) {
          n2 = true;
          s(0);
        }
        return i2.length ? {
          value: i2.shift(),
          done: false
        } : new Promise((e2) => l2 = e2);
      },
      async return() {
        if (!a2) {
          l2 = s(1);
        }
        a2 = true;
        return t;
      },
      [asyncIteratorSymbol()]() {
        return this;
      }
    };
  };
  function toPromise(r2) {
    return new Promise((t2) => {
      var i2 = e;
      var a2;
      r2((e2) => {
        if (0 === e2) {
          Promise.resolve(a2).then(t2);
        } else if (0 === e2.tag) {
          (i2 = e2[0])(0);
        } else {
          a2 = e2[0];
          i2(0);
        }
      });
    });
  }
  var pipe = (...e2) => {
    var r2 = e2[0];
    for (var t2 = 1, i2 = e2.length; t2 < i2; t2++) {
      r2 = e2[t2](r2);
    }
    return r2;
  };
  var rehydrateGraphQlError$1 = (r2) => {
    if (r2 && "string" == typeof r2.message && (r2.extensions || "GraphQLError" === r2.name)) {
      return r2;
    } else if ("object" == typeof r2 && "string" == typeof r2.message) {
      return new GraphQLError(r2.message, r2.nodes, r2.source, r2.positions, r2.path, r2, r2.extensions || {});
    } else {
      return new GraphQLError(r2);
    }
  };
  class CombinedError extends Error {
    constructor(e2) {
      var r2 = (e2.graphQLErrors || []).map(rehydrateGraphQlError$1);
      var t2 = ((e3, r3) => {
        var t3 = "";
        if (e3) {
          return `[Network] ${e3.message}`;
        }
        if (r3) {
          for (var a2 = 0, n2 = r3.length; a2 < n2; a2++) {
            if (t3) {
              t3 += "\n";
            }
            t3 += `[GraphQL] ${r3[a2].message}`;
          }
        }
        return t3;
      })(e2.networkError, r2);
      super(t2);
      this.name = "CombinedError";
      this.message = t2;
      this.graphQLErrors = r2;
      this.networkError = e2.networkError;
      this.response = e2.response;
    }
    toString() {
      return this.message;
    }
  }
  var phash = (e2, r2) => {
    var t2 = 0 | (r2 || 5381);
    for (var a2 = 0, n2 = 0 | e2.length; a2 < n2; a2++) {
      t2 = (t2 << 5) + t2 + e2.charCodeAt(a2);
    }
    return t2;
  };
  var i = /* @__PURE__ */ new Set();
  var f = /* @__PURE__ */ new WeakMap();
  var stringify = (e2, r2) => {
    if (null === e2 || i.has(e2)) {
      return "null";
    } else if ("object" != typeof e2) {
      return JSON.stringify(e2) || "";
    } else if (e2.toJSON) {
      return stringify(e2.toJSON(), r2);
    } else if (Array.isArray(e2)) {
      var t2 = "[";
      for (var a2 = 0, n2 = e2.length; a2 < n2; a2++) {
        if (t2.length > 1) {
          t2 += ",";
        }
        t2 += stringify(e2[a2], r2) || "null";
      }
      return t2 += "]";
    } else if (!r2 && (d !== NoopConstructor && e2 instanceof d || l !== NoopConstructor && e2 instanceof l)) {
      return "null";
    }
    var o2 = Object.keys(e2).sort();
    if (!o2.length && e2.constructor && Object.getPrototypeOf(e2).constructor !== Object.prototype.constructor) {
      var s2 = f.get(e2) || Math.random().toString(36).slice(2);
      f.set(e2, s2);
      return stringify({
        __key: s2
      }, r2);
    }
    i.add(e2);
    var c2 = "{";
    for (var v2 = 0, u2 = o2.length; v2 < u2; v2++) {
      var p2 = stringify(e2[o2[v2]], r2);
      if (p2) {
        if (c2.length > 1) {
          c2 += ",";
        }
        c2 += stringify(o2[v2], r2) + ":" + p2;
      }
    }
    i.delete(e2);
    return c2 += "}";
  };
  var extract = (e2, r2, t2) => {
    if (null == t2 || "object" != typeof t2 || t2.toJSON || i.has(t2)) ;
    else if (Array.isArray(t2)) {
      for (var a2 = 0, n2 = t2.length; a2 < n2; a2++) {
        extract(e2, `${r2}.${a2}`, t2[a2]);
      }
    } else if (t2 instanceof d || t2 instanceof l) {
      e2.set(r2, t2);
    } else {
      i.add(t2);
      for (var o2 in t2) {
        extract(e2, `${r2}.${o2}`, t2[o2]);
      }
    }
  };
  var stringifyVariables = (e2, r2) => {
    i.clear();
    return stringify(e2, r2 || false);
  };
  class NoopConstructor {
  }
  var d = "undefined" != typeof File ? File : NoopConstructor;
  var l = "undefined" != typeof Blob ? Blob : NoopConstructor;
  var c = /("{3}[\s\S]*"{3}|"(?:\\.|[^"])*")/g;
  var v = /(?:#[^\n\r]+)?(?:[\r\n]+|$)/g;
  var replaceOutsideStrings = (e2, r2) => r2 % 2 == 0 ? e2.replace(v, "\n") : e2;
  var sanitizeDocument = (e2) => e2.split(c).map(replaceOutsideStrings).join("").trim();
  var u = /* @__PURE__ */ new Map();
  var p = /* @__PURE__ */ new Map();
  var stringifyDocument = (e2) => {
    var t2;
    if ("string" == typeof e2) {
      t2 = sanitizeDocument(e2);
    } else if (e2.loc && p.get(e2.__key) === e2) {
      t2 = e2.loc.source.body;
    } else {
      t2 = u.get(e2) || sanitizeDocument(print(e2));
      u.set(e2, t2);
    }
    if ("string" != typeof e2 && !e2.loc) {
      e2.loc = {
        start: 0,
        end: t2.length,
        source: {
          body: t2,
          name: "gql",
          locationOffset: {
            line: 1,
            column: 1
          }
        }
      };
    }
    return t2;
  };
  var hashDocument = (e2) => {
    var r2;
    if (e2.documentId) {
      r2 = phash(e2.documentId);
    } else {
      r2 = phash(stringifyDocument(e2));
      if (e2.definitions) {
        var t2 = getOperationName(e2);
        if (t2) {
          r2 = phash(`
# ${t2}`, r2);
        }
      }
    }
    return r2;
  };
  var keyDocument = (e2) => {
    var r2;
    var t2;
    if ("string" == typeof e2) {
      r2 = hashDocument(e2);
      t2 = p.get(r2) || parse(e2, {
        noLocation: true
      });
    } else {
      r2 = e2.__key || hashDocument(e2);
      t2 = p.get(r2) || e2;
    }
    if (!t2.loc) {
      stringifyDocument(t2);
    }
    t2.__key = r2;
    p.set(r2, t2);
    return t2;
  };
  var createRequest = (e2, r2, t2) => {
    var a2 = r2 || {};
    var n2 = keyDocument(e2);
    var o2 = stringifyVariables(a2, true);
    var s2 = n2.__key;
    if ("{}" !== o2) {
      s2 = phash(o2, s2);
    }
    return {
      key: s2,
      query: n2,
      variables: a2,
      extensions: t2
    };
  };
  var getOperationName = (e2) => {
    for (var r2 = 0, a2 = e2.definitions.length; r2 < a2; r2++) {
      var n2 = e2.definitions[r2];
      if (n2.kind === e$1.OPERATION_DEFINITION) {
        return n2.name ? n2.name.value : void 0;
      }
    }
  };
  var getOperationType = (e2) => {
    for (var r2 = 0, a2 = e2.definitions.length; r2 < a2; r2++) {
      var n2 = e2.definitions[r2];
      if (n2.kind === e$1.OPERATION_DEFINITION) {
        return n2.operation;
      }
    }
  };
  var makeResult = (e2, r2, t2) => {
    if (!("data" in r2 || "errors" in r2 && Array.isArray(r2.errors))) {
      throw new Error("No Content");
    }
    var a2 = "subscription" === e2.kind;
    return {
      operation: e2,
      data: r2.data,
      error: Array.isArray(r2.errors) ? new CombinedError({
        graphQLErrors: r2.errors,
        response: t2
      }) : void 0,
      extensions: r2.extensions ? {
        ...r2.extensions
      } : void 0,
      hasNext: null == r2.hasNext ? a2 : r2.hasNext,
      stale: false
    };
  };
  var deepMerge = (e2, r2) => {
    if ("object" == typeof e2 && null != e2) {
      if (Array.isArray(e2)) {
        e2 = [...e2];
        for (var t2 = 0, a2 = r2.length; t2 < a2; t2++) {
          e2[t2] = deepMerge(e2[t2], r2[t2]);
        }
        return e2;
      }
      if (!e2.constructor || e2.constructor === Object) {
        e2 = {
          ...e2
        };
        for (var n2 in r2) {
          e2[n2] = deepMerge(e2[n2], r2[n2]);
        }
        return e2;
      }
    }
    return r2;
  };
  var mergeResultPatch = (e2, r2, t2, a2) => {
    var n2 = e2.error ? e2.error.graphQLErrors : [];
    var o2 = !!e2.extensions || !!(r2.payload || r2).extensions;
    var s2 = {
      ...e2.extensions,
      ...(r2.payload || r2).extensions
    };
    var i2 = r2.incremental;
    if ("path" in r2) {
      i2 = [r2];
    }
    var f2 = {
      data: e2.data
    };
    if (i2) {
      var _loop = function() {
        var e3 = i2[d2];
        if (Array.isArray(e3.errors)) {
          n2.push(...e3.errors);
        }
        if (e3.extensions) {
          Object.assign(s2, e3.extensions);
          o2 = true;
        }
        var r3 = "data";
        var t3 = f2;
        var l3 = [];
        if (e3.path) {
          l3 = e3.path;
        } else if (a2) {
          var c2 = a2.find((r4) => r4.id === e3.id);
          if (e3.subPath) {
            l3 = [...c2.path, ...e3.subPath];
          } else {
            l3 = c2.path;
          }
        }
        for (var v2 = 0, u2 = l3.length; v2 < u2; r3 = l3[v2++]) {
          t3 = t3[r3] = Array.isArray(t3[r3]) ? [...t3[r3]] : {
            ...t3[r3]
          };
        }
        if (e3.items) {
          var p2 = +r3 >= 0 ? r3 : 0;
          for (var h2 = 0, y2 = e3.items.length; h2 < y2; h2++) {
            t3[p2 + h2] = deepMerge(t3[p2 + h2], e3.items[h2]);
          }
        } else if (void 0 !== e3.data) {
          t3[r3] = deepMerge(t3[r3], e3.data);
        }
      };
      for (var d2 = 0, l2 = i2.length; d2 < l2; d2++) {
        _loop();
      }
    } else {
      f2.data = (r2.payload || r2).data || e2.data;
      n2 = r2.errors || r2.payload && r2.payload.errors || n2;
    }
    return {
      operation: e2.operation,
      data: f2.data,
      error: n2.length ? new CombinedError({
        graphQLErrors: n2,
        response: t2
      }) : void 0,
      extensions: o2 ? s2 : void 0,
      hasNext: null != r2.hasNext ? r2.hasNext : e2.hasNext,
      stale: false
    };
  };
  var makeErrorResult = (e2, r2, t2) => ({
    operation: e2,
    data: void 0,
    error: new CombinedError({
      networkError: r2,
      response: t2
    }),
    extensions: void 0,
    hasNext: false,
    stale: false
  });
  function makeFetchBody(e2) {
    var r2 = {
      query: void 0,
      documentId: void 0,
      operationName: getOperationName(e2.query),
      variables: e2.variables || void 0,
      extensions: e2.extensions
    };
    if ("documentId" in e2.query && e2.query.documentId && (!e2.query.definitions || !e2.query.definitions.length)) {
      r2.documentId = e2.query.documentId;
    } else if (!e2.extensions || !e2.extensions.persistedQuery || e2.extensions.persistedQuery.miss) {
      r2.query = stringifyDocument(e2.query);
    }
    return r2;
  }
  var makeFetchURL = (e2, r2) => {
    var t2 = "query" === e2.kind && e2.context.preferGetMethod;
    if (!t2 || !r2) {
      return e2.context.url;
    }
    var a2 = splitOutSearchParams(e2.context.url);
    for (var n2 in r2) {
      var o2 = r2[n2];
      if (o2) {
        a2[1].set(n2, "object" == typeof o2 ? stringifyVariables(o2) : o2);
      }
    }
    var s2 = a2.join("?");
    if (s2.length > 2047 && "force" !== t2) {
      e2.context.preferGetMethod = false;
      return e2.context.url;
    }
    return s2;
  };
  var splitOutSearchParams = (e2) => {
    var r2 = e2.indexOf("?");
    return r2 > -1 ? [e2.slice(0, r2), new URLSearchParams(e2.slice(r2 + 1))] : [e2, new URLSearchParams()];
  };
  var serializeBody = (e2, r2) => {
    if (r2 && !("query" === e2.kind && !!e2.context.preferGetMethod)) {
      var t2 = stringifyVariables(r2);
      var a2 = ((e3) => {
        var r3 = /* @__PURE__ */ new Map();
        if (d !== NoopConstructor || l !== NoopConstructor) {
          i.clear();
          extract(r3, "variables", e3);
        }
        return r3;
      })(r2.variables);
      if (a2.size) {
        var n2 = new FormData();
        n2.append("operations", t2);
        n2.append("map", stringifyVariables({
          ...[...a2.keys()].map((e3) => [e3])
        }));
        var o2 = 0;
        for (var s2 of a2.values()) {
          n2.append("" + o2++, s2);
        }
        return n2;
      }
      return t2;
    }
  };
  var makeFetchOptions = (e2, r2) => {
    var t2 = {
      accept: "subscription" === e2.kind ? "text/event-stream, multipart/mixed" : "application/graphql-response+json, application/graphql+json, application/json, text/event-stream, multipart/mixed"
    };
    var a2 = ("function" == typeof e2.context.fetchOptions ? e2.context.fetchOptions() : e2.context.fetchOptions) || {};
    if (a2.headers) {
      if (((e3) => "has" in e3 && !Object.keys(e3).length)(a2.headers)) {
        a2.headers.forEach((e3, r3) => {
          t2[r3] = e3;
        });
      } else if (Array.isArray(a2.headers)) {
        a2.headers.forEach((e3, r3) => {
          if (Array.isArray(e3)) {
            if (t2[e3[0]]) {
              t2[e3[0]] = `${t2[e3[0]]},${e3[1]}`;
            } else {
              t2[e3[0]] = e3[1];
            }
          } else {
            t2[r3] = e3;
          }
        });
      } else {
        for (var n2 in a2.headers) {
          t2[n2.toLowerCase()] = a2.headers[n2];
        }
      }
    }
    var o2 = serializeBody(e2, r2);
    if ("string" == typeof o2 && !t2["content-type"]) {
      t2["content-type"] = "application/json";
    }
    return {
      ...a2,
      method: o2 ? "POST" : "GET",
      body: o2,
      headers: t2
    };
  };
  var h = /boundary="?([^=";]+)"?/i;
  var y = /data: ?([^\n]+)/;
  async function* streamBody(e2) {
    if (e2.body[Symbol.asyncIterator]) {
      for await (var r2 of e2.body) {
        yield r2;
      }
    } else {
      var t2 = e2.body.getReader();
      var a2;
      try {
        while (!(a2 = await t2.read()).done) {
          yield a2.value;
        }
      } finally {
        t2.cancel();
      }
    }
  }
  async function* streamToBoundedChunks(e2, r2) {
    var t2 = "undefined" != typeof TextDecoder ? new TextDecoder() : null;
    var a2 = "";
    var n2;
    for await (var o2 of e2) {
      a2 += "Buffer" === o2.constructor.name ? o2.toString() : t2.decode(o2, {
        stream: true
      });
      while ((n2 = a2.indexOf(r2)) > -1) {
        yield a2.slice(0, n2);
        a2 = a2.slice(n2 + r2.length);
      }
    }
  }
  async function* fetchOperation(e2, r2, t2) {
    var a2 = true;
    var n2 = null;
    var o2;
    try {
      yield await Promise.resolve();
      var s2 = (o2 = await (e2.context.fetch || fetch)(r2, t2)).headers.get("Content-Type") || "";
      var i2;
      if (/multipart\/mixed/i.test(s2)) {
        i2 = async function* parseMultipartMixed(e3, r3) {
          var t3 = e3.match(h);
          var a3 = "--" + (t3 ? t3[1] : "-");
          var n3 = true;
          var o3;
          for await (var s3 of streamToBoundedChunks(streamBody(r3), "\r\n" + a3)) {
            if (n3) {
              n3 = false;
              var i3 = s3.indexOf(a3);
              if (i3 > -1) {
                s3 = s3.slice(i3 + a3.length);
              } else {
                continue;
              }
            }
            try {
              yield o3 = JSON.parse(s3.slice(s3.indexOf("\r\n\r\n") + 4));
            } catch (e4) {
              if (!o3) {
                throw e4;
              }
            }
            if (o3 && false === o3.hasNext) {
              break;
            }
          }
          if (o3 && false !== o3.hasNext) {
            yield {
              hasNext: false
            };
          }
        }(s2, o2);
      } else if (/text\/event-stream/i.test(s2)) {
        i2 = async function* parseEventStream(e3) {
          var r3;
          for await (var t3 of streamToBoundedChunks(streamBody(e3), "\n\n")) {
            var a3 = t3.match(y);
            if (a3) {
              var n3 = a3[1];
              try {
                yield r3 = JSON.parse(n3);
              } catch (e4) {
                if (!r3) {
                  throw e4;
                }
              }
              if (r3 && false === r3.hasNext) {
                break;
              }
            }
          }
          if (r3 && false !== r3.hasNext) {
            yield {
              hasNext: false
            };
          }
        }(o2);
      } else if (!/text\//i.test(s2)) {
        i2 = async function* parseJSON(e3) {
          yield JSON.parse(await e3.text());
        }(o2);
      } else {
        i2 = async function* parseMaybeJSON(e3) {
          var r3 = await e3.text();
          try {
            var t3 = JSON.parse(r3);
            if (true) {
              console.warn('Found response with content-type "text/plain" but it had a valid "application/json" response.');
            }
            yield t3;
          } catch (e4) {
            throw new Error(r3);
          }
        }(o2);
      }
      var f2;
      for await (var d2 of i2) {
        if (d2.pending && !n2) {
          f2 = d2.pending;
        } else if (d2.pending) {
          f2 = [...f2, ...d2.pending];
        }
        n2 = n2 ? mergeResultPatch(n2, d2, o2, f2) : makeResult(e2, d2, o2);
        a2 = false;
        yield n2;
        a2 = true;
      }
      if (!n2) {
        yield n2 = makeResult(e2, {}, o2);
      }
    } catch (r3) {
      if (!a2) {
        throw r3;
      }
      yield makeErrorResult(e2, o2 && (o2.status < 200 || o2.status >= 300) && o2.statusText ? new Error(o2.statusText) : r3, o2);
    }
  }
  function makeFetchSource(e2, r2, t2) {
    var a2;
    if ("undefined" != typeof AbortController) {
      t2.signal = (a2 = new AbortController()).signal;
    }
    return onEnd(() => {
      if (a2) {
        a2.abort();
      }
    })(filter((e3) => !!e3)(fromAsyncIterable(fetchOperation(e2, r2, t2))));
  }
  var collectTypes = (e2, r2) => {
    if (Array.isArray(e2)) {
      for (var t2 = 0, n2 = e2.length; t2 < n2; t2++) {
        collectTypes(e2[t2], r2);
      }
    } else if ("object" == typeof e2 && null !== e2) {
      for (var a2 in e2) {
        if ("__typename" === a2 && "string" == typeof e2[a2]) {
          r2.add(e2[a2]);
        } else {
          collectTypes(e2[a2], r2);
        }
      }
    }
    return r2;
  };
  var formatNode = (r2) => {
    if ("definitions" in r2) {
      var t2 = [];
      for (var n2 = 0, a2 = r2.definitions.length; n2 < a2; n2++) {
        var i2 = formatNode(r2.definitions[n2]);
        t2.push(i2);
      }
      return {
        ...r2,
        definitions: t2
      };
    }
    if ("directives" in r2 && r2.directives && r2.directives.length) {
      var o2 = [];
      var s2 = {};
      for (var c2 = 0, u2 = r2.directives.length; c2 < u2; c2++) {
        var p2 = r2.directives[c2];
        var d2 = p2.name.value;
        if ("_" !== d2[0]) {
          o2.push(p2);
        } else {
          d2 = d2.slice(1);
        }
        s2[d2] = p2;
      }
      r2 = {
        ...r2,
        directives: o2,
        _directives: s2
      };
    }
    if ("selectionSet" in r2) {
      var l2 = [];
      var v2 = r2.kind === e$1.OPERATION_DEFINITION;
      if (r2.selectionSet) {
        for (var f2 = 0, h2 = r2.selectionSet.selections.length; f2 < h2; f2++) {
          var k2 = r2.selectionSet.selections[f2];
          v2 = v2 || k2.kind === e$1.FIELD && "__typename" === k2.name.value && !k2.alias;
          var y2 = formatNode(k2);
          l2.push(y2);
        }
        if (!v2) {
          l2.push({
            kind: e$1.FIELD,
            name: {
              kind: e$1.NAME,
              value: "__typename"
            },
            _generated: true
          });
        }
        return {
          ...r2,
          selectionSet: {
            ...r2.selectionSet,
            selections: l2
          }
        };
      }
    }
    return r2;
  };
  var I = /* @__PURE__ */ new Map();
  var formatDocument = (e2) => {
    var t2 = keyDocument(e2);
    var n2 = I.get(t2.__key);
    if (!n2) {
      I.set(t2.__key, n2 = formatNode(t2));
      Object.defineProperty(n2, "__key", {
        value: t2.__key,
        enumerable: false
      });
    }
    return n2;
  };
  function withPromise(e2) {
    var source$ = (r2) => e2(r2);
    source$.toPromise = () => toPromise(take(1)(filter((e3) => !e3.stale && !e3.hasNext)(source$)));
    source$.then = (e3, r2) => source$.toPromise().then(e3, r2);
    source$.subscribe = (e3) => subscribe(e3)(source$);
    return source$;
  }
  function makeOperation(e2, r2, t2) {
    return {
      ...r2,
      kind: e2,
      context: r2.context ? {
        ...r2.context,
        ...t2
      } : t2 || r2.context
    };
  }
  var addMetadata = (e2, r2) => makeOperation(e2.kind, e2, {
    meta: {
      ...e2.context.meta,
      ...r2
    }
  });
  var noop = () => {
  };
  var shouldSkip = ({ kind: e2 }) => "mutation" !== e2 && "query" !== e2;
  var mapTypeNames = (e2) => {
    var r2 = formatDocument(e2.query);
    if (r2 !== e2.query) {
      var t2 = makeOperation(e2.kind, e2);
      t2.query = r2;
      return t2;
    } else {
      return e2;
    }
  };
  var cacheExchange = ({ forward: e2, client: r2, dispatchDebug: t2 }) => {
    var a2 = /* @__PURE__ */ new Map();
    var i2 = /* @__PURE__ */ new Map();
    var isOperationCached = (e3) => "query" === e3.kind && "network-only" !== e3.context.requestPolicy && ("cache-only" === e3.context.requestPolicy || a2.has(e3.key));
    return (o2) => {
      var s2 = map((e3) => {
        var i3 = a2.get(e3.key);
        t2({
          operation: e3,
          ...i3 ? {
            type: "cacheHit",
            message: "The result was successfully retrieved from the cache"
          } : {
            type: "cacheMiss",
            message: "The result could not be retrieved from the cache"
          },
          source: "cacheExchange"
        });
        var o3 = i3 || makeResult(e3, {
          data: null
        });
        o3 = {
          ...o3,
          operation: addMetadata(e3, {
            cacheOutcome: i3 ? "hit" : "miss"
          })
        };
        if ("cache-and-network" === e3.context.requestPolicy) {
          o3.stale = true;
          reexecuteOperation(r2, e3);
        }
        return o3;
      })(filter((e3) => !shouldSkip(e3) && isOperationCached(e3))(o2));
      var c2 = onPush((e3) => {
        var { operation: n2 } = e3;
        if (!n2) {
          return;
        }
        var o3 = n2.context.additionalTypenames || [];
        if ("subscription" !== e3.operation.kind) {
          o3 = ((e4) => [...collectTypes(e4, /* @__PURE__ */ new Set())])(e3.data).concat(o3);
        }
        if ("mutation" === e3.operation.kind || "subscription" === e3.operation.kind) {
          var s3 = /* @__PURE__ */ new Set();
          t2({
            type: "cacheInvalidation",
            message: `The following typenames have been invalidated: ${o3}`,
            operation: n2,
            data: {
              typenames: o3,
              response: e3
            },
            source: "cacheExchange"
          });
          for (var c3 = 0; c3 < o3.length; c3++) {
            var u2 = o3[c3];
            var p2 = i2.get(u2);
            if (!p2) {
              i2.set(u2, p2 = /* @__PURE__ */ new Set());
            }
            for (var d2 of p2.values()) {
              s3.add(d2);
            }
            p2.clear();
          }
          for (var l2 of s3.values()) {
            if (a2.has(l2)) {
              n2 = a2.get(l2).operation;
              a2.delete(l2);
              reexecuteOperation(r2, n2);
            }
          }
        } else if ("query" === n2.kind && e3.data) {
          a2.set(n2.key, e3);
          for (var v2 = 0; v2 < o3.length; v2++) {
            var f2 = o3[v2];
            var h2 = i2.get(f2);
            if (!h2) {
              i2.set(f2, h2 = /* @__PURE__ */ new Set());
            }
            h2.add(n2.key);
          }
        }
      })(e2(filter((e3) => "query" !== e3.kind || "cache-only" !== e3.context.requestPolicy)(map((e3) => addMetadata(e3, {
        cacheOutcome: "miss"
      }))(merge([map(mapTypeNames)(filter((e3) => !shouldSkip(e3) && !isOperationCached(e3))(o2)), filter((e3) => shouldSkip(e3))(o2)])))));
      return merge([s2, c2]);
    };
  };
  var reexecuteOperation = (e2, r2) => e2.reexecuteOperation(makeOperation(r2.kind, r2, {
    requestPolicy: "network-only"
  }));
  var subscriptionExchange = ({ forwardSubscription: e2, enableAllOperations: r2, isSubscriptionOperation: t2 }) => ({ client: a2, forward: i2 }) => {
    var u2 = t2 || ((e3) => "subscription" === e3.kind || !!r2 && ("query" === e3.kind || "mutation" === e3.kind));
    return (r3) => {
      var t3 = mergeMap((t4) => {
        var { key: i3 } = t4;
        var u3 = filter((e3) => "teardown" === e3.kind && e3.key === i3)(r3);
        return takeUntil(u3)(((r4) => {
          var t5 = e2(makeFetchBody(r4), r4);
          return make((e3) => {
            var i4 = false;
            var o2;
            var u4;
            function nextResult(t6) {
              e3.next(u4 = u4 ? mergeResultPatch(u4, t6) : makeResult(r4, t6));
            }
            Promise.resolve().then(() => {
              if (i4) {
                return;
              }
              o2 = t5.subscribe({
                next: nextResult,
                error(t6) {
                  if (Array.isArray(t6)) {
                    nextResult({
                      errors: t6
                    });
                  } else {
                    e3.next(makeErrorResult(r4, t6));
                  }
                  e3.complete();
                },
                complete() {
                  if (!i4) {
                    i4 = true;
                    if ("subscription" === r4.kind) {
                      a2.reexecuteOperation(makeOperation("teardown", r4, r4.context));
                    }
                    if (u4 && u4.hasNext) {
                      nextResult({
                        hasNext: false
                      });
                    }
                    e3.complete();
                  }
                }
              });
            });
            return () => {
              i4 = true;
              if (o2) {
                o2.unsubscribe();
              }
            };
          });
        })(t4));
      })(filter((e3) => "teardown" !== e3.kind && u2(e3))(r3));
      var p2 = i2(filter((e3) => "teardown" === e3.kind || !u2(e3))(r3));
      return merge([t3, p2]);
    };
  };
  var fetchExchange = ({ forward: e2, dispatchDebug: r2 }) => (t2) => {
    var n2 = mergeMap((e3) => {
      var n3 = makeFetchBody(e3);
      var a3 = makeFetchURL(e3, n3);
      var i2 = makeFetchOptions(e3, n3);
      r2({
        type: "fetchRequest",
        message: "A fetch request is being executed.",
        operation: e3,
        data: {
          url: a3,
          fetchOptions: i2
        },
        source: "fetchExchange"
      });
      var s2 = takeUntil(filter((r3) => "teardown" === r3.kind && r3.key === e3.key)(t2))(makeFetchSource(e3, a3, i2));
      {
        return onPush((t3) => {
          var n4 = !t3.data ? t3.error : void 0;
          r2({
            type: n4 ? "fetchError" : "fetchSuccess",
            message: `A ${n4 ? "failed" : "successful"} fetch response has been returned.`,
            operation: e3,
            data: {
              url: a3,
              fetchOptions: i2,
              value: n4 || t3
            },
            source: "fetchExchange"
          });
        })(s2);
      }
    })(filter((e3) => "teardown" !== e3.kind && ("subscription" !== e3.kind || !!e3.context.fetchSubscriptions))(t2));
    var a2 = e2(filter((e3) => "teardown" === e3.kind || "subscription" === e3.kind && !e3.context.fetchSubscriptions)(t2));
    return merge([n2, a2]);
  };
  var composeExchanges = (e2) => ({ client: r2, forward: t2, dispatchDebug: n2 }) => e2.reduceRight((e3, t3) => {
    var a2 = false;
    return t3({
      client: r2,
      forward(r3) {
        {
          if (a2) {
            throw new Error("forward() must only be called once in each Exchange.");
          }
          a2 = true;
        }
        return share(e3(share(r3)));
      },
      dispatchDebug(e4) {
        n2({
          timestamp: Date.now(),
          source: t3.name,
          ...e4
        });
      }
    });
  }, t2);
  var mapExchange = ({ onOperation: e2, onResult: r2, onError: t2 }) => ({ forward: n2 }) => (a2) => mergeMap((e3) => {
    if (t2 && e3.error) {
      t2(e3.error, e3.operation);
    }
    var n3 = r2 && r2(e3) || e3;
    return "then" in n3 ? fromPromise(n3) : fromValue(n3);
  })(n2(mergeMap((r3) => {
    var t3 = e2 && e2(r3) || r3;
    return "then" in t3 ? fromPromise(t3) : fromValue(t3);
  })(a2)));
  var fallbackExchange = ({ dispatchDebug: e2 }) => (r2) => {
    {
      r2 = onPush((r3) => {
        if ("teardown" !== r3.kind && true) {
          var t2 = `No exchange has handled operations of kind "${r3.kind}". Check whether you've added an exchange responsible for these operations.`;
          e2({
            type: "fallbackCatch",
            message: t2,
            operation: r3,
            source: "fallbackExchange"
          });
          console.warn(t2);
        }
      })(r2);
    }
    return filter((e3) => false)(r2);
  };
  var C = function Client2(e2) {
    if (!e2.url) {
      throw new Error("You are creating an urql-client without a url.");
    }
    var r2 = 0;
    var t2 = /* @__PURE__ */ new Map();
    var n2 = /* @__PURE__ */ new Map();
    var a2 = /* @__PURE__ */ new Set();
    var i2 = [];
    var o2 = {
      url: e2.url,
      fetchSubscriptions: e2.fetchSubscriptions,
      fetchOptions: e2.fetchOptions,
      fetch: e2.fetch,
      preferGetMethod: null != e2.preferGetMethod ? e2.preferGetMethod : "within-url-limit",
      requestPolicy: e2.requestPolicy || "cache-first"
    };
    var s2 = makeSubject();
    function nextOperation(e3) {
      if ("mutation" === e3.kind || "teardown" === e3.kind || !a2.has(e3.key)) {
        if ("teardown" === e3.kind) {
          a2.delete(e3.key);
        } else if ("mutation" !== e3.kind) {
          a2.add(e3.key);
        }
        s2.next(e3);
      }
    }
    var c2 = false;
    function dispatchOperation(e3) {
      if (e3) {
        nextOperation(e3);
      }
      if (!c2) {
        c2 = true;
        while (c2 && (e3 = i2.shift())) {
          nextOperation(e3);
        }
        c2 = false;
      }
    }
    var makeResultSource = (e3) => {
      var r3 = takeUntil(filter((r4) => "teardown" === r4.kind && r4.key === e3.key)(s2.source))(filter((r4) => r4.operation.kind === e3.kind && r4.operation.key === e3.key && (!r4.operation.context._instance || r4.operation.context._instance === e3.context._instance))(E2));
      if ("query" !== e3.kind) {
        r3 = takeWhile((e4) => !!e4.hasNext)(r3);
      } else {
        r3 = switchMap((r4) => {
          var t3 = fromValue(r4);
          return r4.stale || r4.hasNext ? t3 : merge([t3, map(() => {
            r4.stale = true;
            return r4;
          })(take(1)(filter((r5) => r5.key === e3.key)(s2.source)))]);
        })(r3);
      }
      if ("mutation" !== e3.kind) {
        r3 = onEnd(() => {
          a2.delete(e3.key);
          t2.delete(e3.key);
          n2.delete(e3.key);
          c2 = false;
          for (var r4 = i2.length - 1; r4 >= 0; r4--) {
            if (i2[r4].key === e3.key) {
              i2.splice(r4, 1);
            }
          }
          nextOperation(makeOperation("teardown", e3, e3.context));
        })(onPush((r4) => {
          if (r4.stale) {
            if (!r4.hasNext) {
              a2.delete(e3.key);
            } else {
              for (var n3 = 0; n3 < i2.length; n3++) {
                var o3 = i2[n3];
                if (o3.key === r4.operation.key) {
                  a2.delete(o3.key);
                  break;
                }
              }
            }
          } else if (!r4.hasNext) {
            a2.delete(e3.key);
          }
          t2.set(e3.key, r4);
        })(r3));
      } else {
        r3 = onStart(() => {
          nextOperation(e3);
        })(r3);
      }
      return share(r3);
    };
    var u2 = this instanceof Client2 ? this : Object.create(Client2.prototype);
    var p2 = Object.assign(u2, {
      suspense: !!e2.suspense,
      operations$: s2.source,
      reexecuteOperation(e3) {
        if ("teardown" === e3.kind) {
          dispatchOperation(e3);
        } else if ("mutation" === e3.kind) {
          i2.push(e3);
          Promise.resolve().then(dispatchOperation);
        } else if (n2.has(e3.key)) {
          var r3 = false;
          for (var t3 = 0; t3 < i2.length; t3++) {
            if (i2[t3].key === e3.key) {
              i2[t3] = e3;
              r3 = true;
            }
          }
          if (!(r3 || a2.has(e3.key) && "network-only" !== e3.context.requestPolicy)) {
            i2.push(e3);
            Promise.resolve().then(dispatchOperation);
          } else {
            a2.delete(e3.key);
            Promise.resolve().then(dispatchOperation);
          }
        }
      },
      createRequestOperation(e3, t3, n3) {
        if (!n3) {
          n3 = {};
        }
        var a3;
        if ("teardown" !== e3 && (a3 = getOperationType(t3.query)) !== e3) {
          throw new Error(`Expected operation of type "${e3}" but found "${a3}"`);
        }
        return makeOperation(e3, t3, {
          _instance: "mutation" === e3 ? r2 = r2 + 1 | 0 : void 0,
          ...o2,
          ...n3,
          requestPolicy: n3.requestPolicy || o2.requestPolicy,
          suspense: n3.suspense || false !== n3.suspense && p2.suspense
        });
      },
      executeRequestOperation(e3) {
        if ("mutation" === e3.kind) {
          return withPromise(makeResultSource(e3));
        }
        return withPromise(lazy(() => {
          var r3 = n2.get(e3.key);
          if (!r3) {
            n2.set(e3.key, r3 = makeResultSource(e3));
          }
          r3 = onStart(() => {
            dispatchOperation(e3);
          })(r3);
          var a3 = t2.get(e3.key);
          if ("query" === e3.kind && a3 && (a3.stale || a3.hasNext)) {
            return switchMap(fromValue)(merge([r3, filter((r4) => r4 === t2.get(e3.key))(fromValue(a3))]));
          } else {
            return r3;
          }
        }));
      },
      executeQuery(e3, r3) {
        var t3 = p2.createRequestOperation("query", e3, r3);
        return p2.executeRequestOperation(t3);
      },
      executeSubscription(e3, r3) {
        var t3 = p2.createRequestOperation("subscription", e3, r3);
        return p2.executeRequestOperation(t3);
      },
      executeMutation(e3, r3) {
        var t3 = p2.createRequestOperation("mutation", e3, r3);
        return p2.executeRequestOperation(t3);
      },
      readQuery(e3, r3, t3) {
        var n3 = null;
        subscribe((e4) => {
          n3 = e4;
        })(p2.query(e3, r3, t3)).unsubscribe();
        return n3;
      },
      query: (e3, r3, t3) => p2.executeQuery(createRequest(e3, r3), t3),
      subscription: (e3, r3, t3) => p2.executeSubscription(createRequest(e3, r3), t3),
      mutation: (e3, r3, t3) => p2.executeMutation(createRequest(e3, r3), t3)
    });
    var d2 = noop;
    {
      var { next: f2, source: x2 } = makeSubject();
      p2.subscribeToDebugTarget = (e3) => subscribe(e3)(x2);
      d2 = f2;
    }
    var w2 = composeExchanges(e2.exchanges);
    var E2 = share(w2({
      client: p2,
      dispatchDebug: d2,
      forward: fallbackExchange({
        dispatchDebug: d2
      })
    })(s2.source));
    publish(E2);
    return p2;
  };
  function extendedTypeof(val) {
    if (val === null) {
      return "null";
    }
    if (Array.isArray(val)) {
      return "array";
    }
    return typeof val;
  }
  function isObject(val) {
    return extendedTypeof(val) === "object";
  }
  function areGraphQLErrors(obj) {
    return Array.isArray(obj) && // must be at least one error
    obj.length > 0 && // error has at least a message
    obj.every((ob) => "message" in ob);
  }
  function limitCloseReason(reason, whenTooLong) {
    return reason.length < 124 ? reason : whenTooLong;
  }
  const GRAPHQL_TRANSPORT_WS_PROTOCOL = "graphql-transport-ws";
  var CloseCode;
  (function(CloseCode2) {
    CloseCode2[CloseCode2["InternalServerError"] = 4500] = "InternalServerError";
    CloseCode2[CloseCode2["InternalClientError"] = 4005] = "InternalClientError";
    CloseCode2[CloseCode2["BadRequest"] = 4400] = "BadRequest";
    CloseCode2[CloseCode2["BadResponse"] = 4004] = "BadResponse";
    CloseCode2[CloseCode2["Unauthorized"] = 4401] = "Unauthorized";
    CloseCode2[CloseCode2["Forbidden"] = 4403] = "Forbidden";
    CloseCode2[CloseCode2["SubprotocolNotAcceptable"] = 4406] = "SubprotocolNotAcceptable";
    CloseCode2[CloseCode2["ConnectionInitialisationTimeout"] = 4408] = "ConnectionInitialisationTimeout";
    CloseCode2[CloseCode2["ConnectionAcknowledgementTimeout"] = 4504] = "ConnectionAcknowledgementTimeout";
    CloseCode2[CloseCode2["SubscriberAlreadyExists"] = 4409] = "SubscriberAlreadyExists";
    CloseCode2[CloseCode2["TooManyInitialisationRequests"] = 4429] = "TooManyInitialisationRequests";
  })(CloseCode || (CloseCode = {}));
  var MessageType;
  (function(MessageType2) {
    MessageType2["ConnectionInit"] = "connection_init";
    MessageType2["ConnectionAck"] = "connection_ack";
    MessageType2["Ping"] = "ping";
    MessageType2["Pong"] = "pong";
    MessageType2["Subscribe"] = "subscribe";
    MessageType2["Next"] = "next";
    MessageType2["Error"] = "error";
    MessageType2["Complete"] = "complete";
  })(MessageType || (MessageType = {}));
  function validateMessage(val) {
    if (!isObject(val)) {
      throw new Error(`Message is expected to be an object, but got ${extendedTypeof(val)}`);
    }
    if (!val.type) {
      throw new Error(`Message is missing the 'type' property`);
    }
    if (typeof val.type !== "string") {
      throw new Error(`Message is expects the 'type' property to be a string, but got ${extendedTypeof(val.type)}`);
    }
    switch (val.type) {
      case MessageType.ConnectionInit:
      case MessageType.ConnectionAck:
      case MessageType.Ping:
      case MessageType.Pong: {
        if (val.payload != null && !isObject(val.payload)) {
          throw new Error(`"${val.type}" message expects the 'payload' property to be an object or nullish or missing, but got "${val.payload}"`);
        }
        break;
      }
      case MessageType.Subscribe: {
        if (typeof val.id !== "string") {
          throw new Error(`"${val.type}" message expects the 'id' property to be a string, but got ${extendedTypeof(val.id)}`);
        }
        if (!val.id) {
          throw new Error(`"${val.type}" message requires a non-empty 'id' property`);
        }
        if (!isObject(val.payload)) {
          throw new Error(`"${val.type}" message expects the 'payload' property to be an object, but got ${extendedTypeof(val.payload)}`);
        }
        if (typeof val.payload.query !== "string") {
          throw new Error(`"${val.type}" message payload expects the 'query' property to be a string, but got ${extendedTypeof(val.payload.query)}`);
        }
        if (val.payload.variables != null && !isObject(val.payload.variables)) {
          throw new Error(`"${val.type}" message payload expects the 'variables' property to be a an object or nullish or missing, but got ${extendedTypeof(val.payload.variables)}`);
        }
        if (val.payload.operationName != null && extendedTypeof(val.payload.operationName) !== "string") {
          throw new Error(`"${val.type}" message payload expects the 'operationName' property to be a string or nullish or missing, but got ${extendedTypeof(val.payload.operationName)}`);
        }
        if (val.payload.extensions != null && !isObject(val.payload.extensions)) {
          throw new Error(`"${val.type}" message payload expects the 'extensions' property to be a an object or nullish or missing, but got ${extendedTypeof(val.payload.extensions)}`);
        }
        break;
      }
      case MessageType.Next: {
        if (typeof val.id !== "string") {
          throw new Error(`"${val.type}" message expects the 'id' property to be a string, but got ${extendedTypeof(val.id)}`);
        }
        if (!val.id) {
          throw new Error(`"${val.type}" message requires a non-empty 'id' property`);
        }
        if (!isObject(val.payload)) {
          throw new Error(`"${val.type}" message expects the 'payload' property to be an object, but got ${extendedTypeof(val.payload)}`);
        }
        break;
      }
      case MessageType.Error: {
        if (typeof val.id !== "string") {
          throw new Error(`"${val.type}" message expects the 'id' property to be a string, but got ${extendedTypeof(val.id)}`);
        }
        if (!val.id) {
          throw new Error(`"${val.type}" message requires a non-empty 'id' property`);
        }
        if (!areGraphQLErrors(val.payload)) {
          throw new Error(`"${val.type}" message expects the 'payload' property to be an array of GraphQL errors, but got ${JSON.stringify(val.payload)}`);
        }
        break;
      }
      case MessageType.Complete: {
        if (typeof val.id !== "string") {
          throw new Error(`"${val.type}" message expects the 'id' property to be a string, but got ${extendedTypeof(val.id)}`);
        }
        if (!val.id) {
          throw new Error(`"${val.type}" message requires a non-empty 'id' property`);
        }
        break;
      }
      default:
        throw new Error(`Invalid message 'type' property "${val.type}"`);
    }
    return val;
  }
  function parseMessage(data, reviver) {
    return validateMessage(typeof data === "string" ? JSON.parse(data, reviver) : data);
  }
  function stringifyMessage(msg, replacer) {
    validateMessage(msg);
    return JSON.stringify(msg, replacer);
  }
  var __await = function(v2) {
    return this instanceof __await ? (this.v = v2, this) : new __await(v2);
  };
  var __asyncGenerator = function(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i2, q = [];
    return i2 = Object.create((typeof AsyncIterator === "function" ? AsyncIterator : Object).prototype), verb("next"), verb("throw"), verb("return", awaitReturn), i2[Symbol.asyncIterator] = function() {
      return this;
    }, i2;
    function awaitReturn(f2) {
      return function(v2) {
        return Promise.resolve(v2).then(f2, reject2);
      };
    }
    function verb(n2, f2) {
      if (g[n2]) {
        i2[n2] = function(v2) {
          return new Promise(function(a2, b) {
            q.push([n2, v2, a2, b]) > 1 || resume(n2, v2);
          });
        };
        if (f2) i2[n2] = f2(i2[n2]);
      }
    }
    function resume(n2, v2) {
      try {
        step(g[n2](v2));
      } catch (e2) {
        settle(q[0][3], e2);
      }
    }
    function step(r2) {
      r2.value instanceof __await ? Promise.resolve(r2.value.v).then(fulfill, reject2) : settle(q[0][2], r2);
    }
    function fulfill(value2) {
      resume("next", value2);
    }
    function reject2(value2) {
      resume("throw", value2);
    }
    function settle(f2, v2) {
      if (f2(v2), q.shift(), q.length) resume(q[0][0], q[0][1]);
    }
  };
  function createClient(options) {
    const {
      url,
      connectionParams,
      lazy: lazy2 = true,
      onNonLazyError = console.error,
      lazyCloseTimeout: lazyCloseTimeoutMs = 0,
      keepAlive = 0,
      disablePong,
      connectionAckWaitTimeout = 0,
      retryAttempts = 5,
      retryWait = async function randomisedExponentialBackoff(retries2) {
        let retryDelay = 1e3;
        for (let i2 = 0; i2 < retries2; i2++) {
          retryDelay *= 2;
        }
        await new Promise((resolve) => setTimeout(resolve, retryDelay + // add random timeout from 300ms to 3s
        Math.floor(Math.random() * (3e3 - 300) + 300)));
      },
      shouldRetry = isLikeCloseEvent,
      isFatalConnectionProblem,
      on,
      webSocketImpl,
      /**
       * Generates a v4 UUID to be used as the ID using `Math`
       * as the random number generator. Supply your own generator
       * in case you need more uniqueness.
       *
       * Reference: https://gist.github.com/jed/982883
       */
      generateID = function generateUUID() {
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c2) => {
          const r2 = Math.random() * 16 | 0, v2 = c2 == "x" ? r2 : r2 & 3 | 8;
          return v2.toString(16);
        });
      },
      jsonMessageReplacer: replacer,
      jsonMessageReviver: reviver
    } = options;
    let ws2;
    if (webSocketImpl) {
      if (!isWebSocket(webSocketImpl)) {
        throw new Error("Invalid WebSocket implementation provided");
      }
      ws2 = webSocketImpl;
    } else if (typeof WebSocket !== "undefined") {
      ws2 = WebSocket;
    } else if (typeof global !== "undefined") {
      ws2 = global.WebSocket || // @ts-expect-error: Support more browsers
      global.MozWebSocket;
    } else if (typeof window !== "undefined") {
      ws2 = window.WebSocket || // @ts-expect-error: Support more browsers
      window.MozWebSocket;
    }
    if (!ws2)
      throw new Error("WebSocket implementation missing; on Node you can `import WebSocket from 'ws';` and pass `webSocketImpl: WebSocket` to `createClient`");
    const WebSocketImpl = ws2;
    const emitter = (() => {
      const message = /* @__PURE__ */ (() => {
        const listeners2 = {};
        return {
          on(id, listener) {
            listeners2[id] = listener;
            return () => {
              delete listeners2[id];
            };
          },
          emit(message2) {
            var _a;
            if ("id" in message2)
              (_a = listeners2[message2.id]) === null || _a === void 0 ? void 0 : _a.call(listeners2, message2);
          }
        };
      })();
      const listeners = {
        connecting: (on === null || on === void 0 ? void 0 : on.connecting) ? [on.connecting] : [],
        opened: (on === null || on === void 0 ? void 0 : on.opened) ? [on.opened] : [],
        connected: (on === null || on === void 0 ? void 0 : on.connected) ? [on.connected] : [],
        ping: (on === null || on === void 0 ? void 0 : on.ping) ? [on.ping] : [],
        pong: (on === null || on === void 0 ? void 0 : on.pong) ? [on.pong] : [],
        message: (on === null || on === void 0 ? void 0 : on.message) ? [message.emit, on.message] : [message.emit],
        closed: (on === null || on === void 0 ? void 0 : on.closed) ? [on.closed] : [],
        error: (on === null || on === void 0 ? void 0 : on.error) ? [on.error] : []
      };
      return {
        onMessage: message.on,
        on(event, listener) {
          const l2 = listeners[event];
          l2.push(listener);
          return () => {
            l2.splice(l2.indexOf(listener), 1);
          };
        },
        emit(event, ...args) {
          for (const listener of [...listeners[event]]) {
            listener(...args);
          }
        }
      };
    })();
    function errorOrClosed(cb) {
      const listening = [
        // errors are fatal and more critical than close events, throw them first
        emitter.on("error", (err) => {
          listening.forEach((unlisten) => unlisten());
          cb(err);
        }),
        // closes can be graceful and not fatal, throw them second (if error didnt throw)
        emitter.on("closed", (event) => {
          listening.forEach((unlisten) => unlisten());
          cb(event);
        })
      ];
    }
    let connecting, locks = 0, lazyCloseTimeout, retrying = false, retries = 0, disposed = false;
    async function connect() {
      clearTimeout(lazyCloseTimeout);
      const [socket, throwOnClose] = await (connecting !== null && connecting !== void 0 ? connecting : connecting = new Promise((connected, denied) => (async () => {
        if (retrying) {
          await retryWait(retries);
          if (!locks) {
            connecting = void 0;
            return denied({ code: 1e3, reason: "All Subscriptions Gone" });
          }
          retries++;
        }
        emitter.emit("connecting", retrying);
        const socket2 = new WebSocketImpl(typeof url === "function" ? await url() : url, GRAPHQL_TRANSPORT_WS_PROTOCOL);
        let connectionAckTimeout, queuedPing;
        function enqueuePing() {
          if (isFinite(keepAlive) && keepAlive > 0) {
            clearTimeout(queuedPing);
            queuedPing = setTimeout(() => {
              if (socket2.readyState === WebSocketImpl.OPEN) {
                socket2.send(stringifyMessage({ type: MessageType.Ping }));
                emitter.emit("ping", false, void 0);
              }
            }, keepAlive);
          }
        }
        errorOrClosed((errOrEvent) => {
          connecting = void 0;
          clearTimeout(connectionAckTimeout);
          clearTimeout(queuedPing);
          denied(errOrEvent);
          if (errOrEvent instanceof TerminatedCloseEvent) {
            socket2.close(4499, "Terminated");
            socket2.onerror = null;
            socket2.onclose = null;
          }
        });
        socket2.onerror = (err) => emitter.emit("error", err);
        socket2.onclose = (event) => emitter.emit("closed", event);
        socket2.onopen = async () => {
          try {
            emitter.emit("opened", socket2);
            const payload = typeof connectionParams === "function" ? await connectionParams() : connectionParams;
            if (socket2.readyState !== WebSocketImpl.OPEN)
              return;
            socket2.send(stringifyMessage(payload ? {
              type: MessageType.ConnectionInit,
              payload
            } : {
              type: MessageType.ConnectionInit
              // payload is completely absent if not provided
            }, replacer));
            if (isFinite(connectionAckWaitTimeout) && connectionAckWaitTimeout > 0) {
              connectionAckTimeout = setTimeout(() => {
                socket2.close(CloseCode.ConnectionAcknowledgementTimeout, "Connection acknowledgement timeout");
              }, connectionAckWaitTimeout);
            }
            enqueuePing();
          } catch (err) {
            emitter.emit("error", err);
            socket2.close(CloseCode.InternalClientError, limitCloseReason(err instanceof Error ? err.message : new Error(err).message, "Internal client error"));
          }
        };
        let acknowledged = false;
        socket2.onmessage = ({ data }) => {
          try {
            const message = parseMessage(data, reviver);
            emitter.emit("message", message);
            if (message.type === "ping" || message.type === "pong") {
              emitter.emit(message.type, true, message.payload);
              if (message.type === "pong") {
                enqueuePing();
              } else if (!disablePong) {
                socket2.send(stringifyMessage(message.payload ? {
                  type: MessageType.Pong,
                  payload: message.payload
                } : {
                  type: MessageType.Pong
                  // payload is completely absent if not provided
                }));
                emitter.emit("pong", false, message.payload);
              }
              return;
            }
            if (acknowledged)
              return;
            if (message.type !== MessageType.ConnectionAck)
              throw new Error(`First message cannot be of type ${message.type}`);
            clearTimeout(connectionAckTimeout);
            acknowledged = true;
            emitter.emit("connected", socket2, message.payload, retrying);
            retrying = false;
            retries = 0;
            connected([
              socket2,
              new Promise((_, reject2) => errorOrClosed(reject2))
            ]);
          } catch (err) {
            socket2.onmessage = null;
            emitter.emit("error", err);
            socket2.close(CloseCode.BadResponse, limitCloseReason(err instanceof Error ? err.message : new Error(err).message, "Bad response"));
          }
        };
      })()));
      if (socket.readyState === WebSocketImpl.CLOSING)
        await throwOnClose;
      let release = () => {
      };
      const released = new Promise((resolve) => release = resolve);
      return [
        socket,
        release,
        Promise.race([
          // wait for
          released.then(() => {
            if (!locks) {
              const complete = () => socket.close(1e3, "Normal Closure");
              if (isFinite(lazyCloseTimeoutMs) && lazyCloseTimeoutMs > 0) {
                lazyCloseTimeout = setTimeout(() => {
                  if (socket.readyState === WebSocketImpl.OPEN)
                    complete();
                }, lazyCloseTimeoutMs);
              } else {
                complete();
              }
            }
          }),
          // or
          throwOnClose
        ])
      ];
    }
    function shouldRetryConnectOrThrow(errOrCloseEvent) {
      if (isLikeCloseEvent(errOrCloseEvent) && (isFatalInternalCloseCode(errOrCloseEvent.code) || [
        CloseCode.InternalServerError,
        CloseCode.InternalClientError,
        CloseCode.BadRequest,
        CloseCode.BadResponse,
        CloseCode.Unauthorized,
        // CloseCode.Forbidden, might grant access out after retry
        CloseCode.SubprotocolNotAcceptable,
        // CloseCode.ConnectionInitialisationTimeout, might not time out after retry
        // CloseCode.ConnectionAcknowledgementTimeout, might not time out after retry
        CloseCode.SubscriberAlreadyExists,
        CloseCode.TooManyInitialisationRequests
        // 4499, // Terminated, probably because the socket froze, we want to retry
      ].includes(errOrCloseEvent.code)))
        throw errOrCloseEvent;
      if (disposed)
        return false;
      if (isLikeCloseEvent(errOrCloseEvent) && errOrCloseEvent.code === 1e3)
        return locks > 0;
      if (!retryAttempts || retries >= retryAttempts)
        throw errOrCloseEvent;
      if (!shouldRetry(errOrCloseEvent))
        throw errOrCloseEvent;
      if (isFatalConnectionProblem === null || isFatalConnectionProblem === void 0 ? void 0 : isFatalConnectionProblem(errOrCloseEvent))
        throw errOrCloseEvent;
      return retrying = true;
    }
    if (!lazy2) {
      (async () => {
        locks++;
        for (; ; ) {
          try {
            const [, , throwOnClose] = await connect();
            await throwOnClose;
          } catch (errOrCloseEvent) {
            try {
              if (!shouldRetryConnectOrThrow(errOrCloseEvent))
                return;
            } catch (errOrCloseEvent2) {
              return onNonLazyError === null || onNonLazyError === void 0 ? void 0 : onNonLazyError(errOrCloseEvent2);
            }
          }
        }
      })();
    }
    function subscribe2(payload, sink) {
      const id = generateID(payload);
      let done = false, errored = false, releaser = () => {
        locks--;
        done = true;
      };
      (async () => {
        locks++;
        for (; ; ) {
          try {
            const [socket, release, waitForReleaseOrThrowOnClose] = await connect();
            if (done)
              return release();
            const unlisten = emitter.onMessage(id, (message) => {
              switch (message.type) {
                case MessageType.Next: {
                  sink.next(message.payload);
                  return;
                }
                case MessageType.Error: {
                  errored = true, done = true;
                  sink.error(message.payload);
                  releaser();
                  return;
                }
                case MessageType.Complete: {
                  done = true;
                  releaser();
                  return;
                }
              }
            });
            socket.send(stringifyMessage({
              id,
              type: MessageType.Subscribe,
              payload
            }, replacer));
            releaser = () => {
              if (!done && socket.readyState === WebSocketImpl.OPEN)
                socket.send(stringifyMessage({
                  id,
                  type: MessageType.Complete
                }, replacer));
              locks--;
              done = true;
              release();
            };
            await waitForReleaseOrThrowOnClose.finally(unlisten);
            return;
          } catch (errOrCloseEvent) {
            if (!shouldRetryConnectOrThrow(errOrCloseEvent))
              return;
          }
        }
      })().then(() => {
        if (!errored)
          sink.complete();
      }).catch((err) => {
        sink.error(err);
      });
      return () => {
        if (!done)
          releaser();
      };
    }
    return {
      on: emitter.on,
      subscribe: subscribe2,
      iterate(request) {
        const pending = [];
        const deferred = {
          done: false,
          error: null,
          resolve: () => {
          }
        };
        const dispose = subscribe2(request, {
          next(val) {
            pending.push(val);
            deferred.resolve();
          },
          error(err) {
            deferred.done = true;
            deferred.error = err;
            deferred.resolve();
          },
          complete() {
            deferred.done = true;
            deferred.resolve();
          }
        });
        const iterator = function iterator2() {
          return __asyncGenerator(this, arguments, function* iterator_1() {
            for (; ; ) {
              if (!pending.length) {
                yield __await(new Promise((resolve) => deferred.resolve = resolve));
              }
              while (pending.length) {
                yield yield __await(pending.shift());
              }
              if (deferred.error) {
                throw deferred.error;
              }
              if (deferred.done) {
                return yield __await(void 0);
              }
            }
          });
        }();
        iterator.throw = async (err) => {
          if (!deferred.done) {
            deferred.done = true;
            deferred.error = err;
            deferred.resolve();
          }
          return { done: true, value: void 0 };
        };
        iterator.return = async () => {
          dispose();
          return { done: true, value: void 0 };
        };
        return iterator;
      },
      async dispose() {
        disposed = true;
        if (connecting) {
          const [socket] = await connecting;
          socket.close(1e3, "Normal Closure");
        }
      },
      terminate() {
        if (connecting) {
          emitter.emit("closed", new TerminatedCloseEvent());
        }
      }
    };
  }
  class TerminatedCloseEvent extends Error {
    constructor() {
      super(...arguments);
      this.name = "TerminatedCloseEvent";
      this.message = "4499: Terminated";
      this.code = 4499;
      this.reason = "Terminated";
      this.wasClean = false;
    }
  }
  function isLikeCloseEvent(val) {
    return isObject(val) && "code" in val && "reason" in val;
  }
  function isFatalInternalCloseCode(code) {
    if ([
      1e3,
      // Normal Closure is not an erroneous close code
      1001,
      // Going Away
      1006,
      // Abnormal Closure
      1005,
      // No Status Received
      1012,
      // Service Restart
      1013,
      // Try Again Later
      1014
      // Bad Gateway
    ].includes(code))
      return false;
    return code >= 1e3 && code <= 1999;
  }
  function isWebSocket(val) {
    return typeof val === "function" && "constructor" in val && "CLOSED" in val && "CLOSING" in val && "CONNECTING" in val && "OPEN" in val;
  }
  const QueryDocumentKeys = {
    Name: [],
    Document: ["definitions"],
    OperationDefinition: [
      "description",
      "name",
      "variableDefinitions",
      "directives",
      "selectionSet"
    ],
    VariableDefinition: [
      "description",
      "variable",
      "type",
      "defaultValue",
      "directives"
    ],
    Variable: ["name"],
    SelectionSet: ["selections"],
    Field: ["alias", "name", "arguments", "directives", "selectionSet"],
    Argument: ["name", "value"],
    FragmentSpread: ["name", "directives"],
    InlineFragment: ["typeCondition", "directives", "selectionSet"],
    FragmentDefinition: [
      "description",
      "name",
      // Note: fragment variable definitions are deprecated and will removed in v17.0.0
      "variableDefinitions",
      "typeCondition",
      "directives",
      "selectionSet"
    ],
    IntValue: [],
    FloatValue: [],
    StringValue: [],
    BooleanValue: [],
    NullValue: [],
    EnumValue: [],
    ListValue: ["values"],
    ObjectValue: ["fields"],
    ObjectField: ["name", "value"],
    Directive: ["name", "arguments"],
    NamedType: ["name"],
    ListType: ["type"],
    NonNullType: ["type"],
    SchemaDefinition: ["description", "directives", "operationTypes"],
    OperationTypeDefinition: ["type"],
    ScalarTypeDefinition: ["description", "name", "directives"],
    ObjectTypeDefinition: [
      "description",
      "name",
      "interfaces",
      "directives",
      "fields"
    ],
    FieldDefinition: ["description", "name", "arguments", "type", "directives"],
    InputValueDefinition: [
      "description",
      "name",
      "type",
      "defaultValue",
      "directives"
    ],
    InterfaceTypeDefinition: [
      "description",
      "name",
      "interfaces",
      "directives",
      "fields"
    ],
    UnionTypeDefinition: ["description", "name", "directives", "types"],
    EnumTypeDefinition: ["description", "name", "directives", "values"],
    EnumValueDefinition: ["description", "name", "directives"],
    InputObjectTypeDefinition: ["description", "name", "directives", "fields"],
    DirectiveDefinition: ["description", "name", "arguments", "locations"],
    SchemaExtension: ["directives", "operationTypes"],
    ScalarTypeExtension: ["name", "directives"],
    ObjectTypeExtension: ["name", "interfaces", "directives", "fields"],
    InterfaceTypeExtension: ["name", "interfaces", "directives", "fields"],
    UnionTypeExtension: ["name", "directives", "types"],
    EnumTypeExtension: ["name", "directives", "values"],
    InputObjectTypeExtension: ["name", "directives", "fields"],
    TypeCoordinate: ["name"],
    MemberCoordinate: ["name", "memberName"],
    ArgumentCoordinate: ["name", "fieldName", "argumentName"],
    DirectiveCoordinate: ["name"],
    DirectiveArgumentCoordinate: ["name", "argumentName"]
  };
  new Set(Object.keys(QueryDocumentKeys));
  var OperationTypeNode;
  (function(OperationTypeNode2) {
    OperationTypeNode2["QUERY"] = "query";
    OperationTypeNode2["MUTATION"] = "mutation";
    OperationTypeNode2["SUBSCRIPTION"] = "subscription";
  })(OperationTypeNode || (OperationTypeNode = {}));
  var Kind;
  (function(Kind2) {
    Kind2["NAME"] = "Name";
    Kind2["DOCUMENT"] = "Document";
    Kind2["OPERATION_DEFINITION"] = "OperationDefinition";
    Kind2["VARIABLE_DEFINITION"] = "VariableDefinition";
    Kind2["SELECTION_SET"] = "SelectionSet";
    Kind2["FIELD"] = "Field";
    Kind2["ARGUMENT"] = "Argument";
    Kind2["FRAGMENT_SPREAD"] = "FragmentSpread";
    Kind2["INLINE_FRAGMENT"] = "InlineFragment";
    Kind2["FRAGMENT_DEFINITION"] = "FragmentDefinition";
    Kind2["VARIABLE"] = "Variable";
    Kind2["INT"] = "IntValue";
    Kind2["FLOAT"] = "FloatValue";
    Kind2["STRING"] = "StringValue";
    Kind2["BOOLEAN"] = "BooleanValue";
    Kind2["NULL"] = "NullValue";
    Kind2["ENUM"] = "EnumValue";
    Kind2["LIST"] = "ListValue";
    Kind2["OBJECT"] = "ObjectValue";
    Kind2["OBJECT_FIELD"] = "ObjectField";
    Kind2["DIRECTIVE"] = "Directive";
    Kind2["NAMED_TYPE"] = "NamedType";
    Kind2["LIST_TYPE"] = "ListType";
    Kind2["NON_NULL_TYPE"] = "NonNullType";
    Kind2["SCHEMA_DEFINITION"] = "SchemaDefinition";
    Kind2["OPERATION_TYPE_DEFINITION"] = "OperationTypeDefinition";
    Kind2["SCALAR_TYPE_DEFINITION"] = "ScalarTypeDefinition";
    Kind2["OBJECT_TYPE_DEFINITION"] = "ObjectTypeDefinition";
    Kind2["FIELD_DEFINITION"] = "FieldDefinition";
    Kind2["INPUT_VALUE_DEFINITION"] = "InputValueDefinition";
    Kind2["INTERFACE_TYPE_DEFINITION"] = "InterfaceTypeDefinition";
    Kind2["UNION_TYPE_DEFINITION"] = "UnionTypeDefinition";
    Kind2["ENUM_TYPE_DEFINITION"] = "EnumTypeDefinition";
    Kind2["ENUM_VALUE_DEFINITION"] = "EnumValueDefinition";
    Kind2["INPUT_OBJECT_TYPE_DEFINITION"] = "InputObjectTypeDefinition";
    Kind2["DIRECTIVE_DEFINITION"] = "DirectiveDefinition";
    Kind2["SCHEMA_EXTENSION"] = "SchemaExtension";
    Kind2["SCALAR_TYPE_EXTENSION"] = "ScalarTypeExtension";
    Kind2["OBJECT_TYPE_EXTENSION"] = "ObjectTypeExtension";
    Kind2["INTERFACE_TYPE_EXTENSION"] = "InterfaceTypeExtension";
    Kind2["UNION_TYPE_EXTENSION"] = "UnionTypeExtension";
    Kind2["ENUM_TYPE_EXTENSION"] = "EnumTypeExtension";
    Kind2["INPUT_OBJECT_TYPE_EXTENSION"] = "InputObjectTypeExtension";
    Kind2["TYPE_COORDINATE"] = "TypeCoordinate";
    Kind2["MEMBER_COORDINATE"] = "MemberCoordinate";
    Kind2["ARGUMENT_COORDINATE"] = "ArgumentCoordinate";
    Kind2["DIRECTIVE_COORDINATE"] = "DirectiveCoordinate";
    Kind2["DIRECTIVE_ARGUMENT_COORDINATE"] = "DirectiveArgumentCoordinate";
  })(Kind || (Kind = {}));
  var ws = null;
  if (typeof WebSocket !== "undefined") {
    ws = WebSocket;
  } else if (typeof MozWebSocket !== "undefined") {
    ws = MozWebSocket;
  } else if (typeof global !== "undefined") {
    ws = global.WebSocket || global.MozWebSocket;
  } else if (typeof window !== "undefined") {
    ws = window.WebSocket || window.MozWebSocket;
  } else if (typeof self !== "undefined") {
    ws = self.WebSocket || self.MozWebSocket;
  }
  const WebSocket$1 = ws;
  const compileFieldSelection = (fields) => {
    return Object.entries(fields).flatMap(([field, value2]) => {
      if (typeof value2 === "boolean") {
        return value2 ? field : false;
      } else if (value2 instanceof FieldCall) {
        let args = "";
        const signatures = Object.entries(value2.args).filter(([_, value3]) => value3 !== null && value3 !== void 0).map(([name2, value3]) => {
          var _a;
          return `${name2}: ${value3 instanceof Variable ? `$${(_a = value3.name) !== null && _a !== void 0 ? _a : name2}` : JSON.stringify(value3)}`;
        });
        if (signatures.length > 0) {
          args = `(${signatures.join(", ")})`;
        }
        if (value2.subselection) {
          return [`${field}${args} {`, ...compileFieldSelection(value2.subselection), `}`];
        } else {
          return `${field}${args}`;
        }
      } else {
        return [`${field} {`, ...compileFieldSelection(value2), `}`];
      }
    }).filter((value2) => !!value2).map((line) => "  " + line);
  };
  const extractVariables = (fields) => {
    const variables = {};
    const nextName = (name2) => {
      let count = 1;
      if (variables[name2]) {
        while (variables[`${name2}${count}`]) {
          count++;
        }
        return `${name2}${count}`;
      }
      return name2;
    };
    Object.entries(fields).forEach(([_field, value2]) => {
      if (value2 instanceof FieldCall) {
        Object.entries(value2.args).forEach(([name2, value3]) => {
          var _a;
          if (value3 instanceof Variable) {
            variables[(_a = value3.name) !== null && _a !== void 0 ? _a : nextName(name2)] = value3;
          }
        });
        if (value2.subselection) {
          Object.assign(variables, extractVariables(value2.subselection));
        }
      } else if (typeof value2 === "object" && value2 !== null) {
        Object.assign(variables, extractVariables(value2));
      }
    });
    return variables;
  };
  const compileVariables = (operation) => {
    const variables = extractVariables(operation.fields);
    if (Object.keys(variables).length === 0)
      return "";
    const signatures = Object.entries(variables).map(([name2, variable]) => {
      return `$${name2}: ${variable.type}`;
    });
    return `(${signatures.join(", ")})`;
  };
  class FieldCall {
    constructor(args, subselection) {
      Object.defineProperty(this, "args", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: args
      });
      Object.defineProperty(this, "subselection", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: subselection
      });
    }
  }
  class Variable {
    constructor(type2, name2, value2) {
      Object.defineProperty(this, "type", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: type2
      });
      Object.defineProperty(this, "name", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: name2
      });
      Object.defineProperty(this, "value", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: value2
      });
    }
    present() {
      return this.value != null;
    }
  }
  const Call = (args, subselection) => new FieldCall(args, subselection);
  const Var = (options) => new Variable(options.type + (options.required ? "!" : ""), options.name, options.value);
  const compile = (operation) => {
    var _a;
    const signature = compileVariables(operation);
    const directives2 = operation.directives && operation.directives.length > 0 ? ` ${operation.directives.join(" ")}` : "";
    return `${operation.type} ${(_a = operation.name) !== null && _a !== void 0 ? _a : ""}${signature}${directives2} {
${compileFieldSelection(operation.fields).join("\n")}
}`;
  };
  const compileWithVariableValues = (operation) => {
    const variables = extractVariables(operation.fields);
    return {
      query: compile(operation),
      variables: Object.entries(variables !== null && variables !== void 0 ? variables : {}).reduce((acc, [name2, variable]) => {
        if (typeof variable.value !== "undefined") {
          acc[name2] = variable.value;
        }
        return acc;
      }, {})
    };
  };
  const Hydrators = {
    DateTime(value2) {
      return new Date(value2);
    }
  };
  class DataHydrator {
    constructor(plan) {
      this.plan = plan;
    }
    apply(source) {
      if (Array.isArray(source)) {
        return source.map((object) => this.hydrateObject(object));
      } else {
        return this.hydrateObject(source);
      }
    }
    hydrateObject(object) {
      const hydrated = { ...object };
      for (const [key2, hydrator] of Object.entries(this.plan)) {
        const value2 = hydrated[key2];
        if (value2 != null) {
          hydrated[key2] = Hydrators[hydrator](value2);
        }
      }
      return hydrated;
    }
  }
  function klona(x) {
    if (typeof x !== "object") return x;
    var k, tmp, str = Object.prototype.toString.call(x);
    if (str === "[object Object]") {
      if (x.constructor !== Object && typeof x.constructor === "function") {
        tmp = new x.constructor();
        for (k in x) {
          if (x.hasOwnProperty(k) && tmp[k] !== x[k]) {
            tmp[k] = klona(x[k]);
          }
        }
      } else {
        tmp = {};
        for (k in x) {
          if (k === "__proto__") {
            Object.defineProperty(tmp, k, {
              value: klona(x[k]),
              configurable: true,
              enumerable: true,
              writable: true
            });
          } else {
            tmp[k] = klona(x[k]);
          }
        }
      }
      return tmp;
    }
    if (str === "[object Array]") {
      k = x.length;
      for (tmp = Array(k); k--; ) {
        tmp[k] = klona(x[k]);
      }
      return tmp;
    }
    if (str === "[object Set]") {
      tmp = /* @__PURE__ */ new Set();
      x.forEach(function(val) {
        tmp.add(klona(val));
      });
      return tmp;
    }
    if (str === "[object Map]") {
      tmp = /* @__PURE__ */ new Map();
      x.forEach(function(val, key2) {
        tmp.set(klona(key2), klona(val));
      });
      return tmp;
    }
    if (str === "[object Date]") {
      return /* @__PURE__ */ new Date(+x);
    }
    if (str === "[object RegExp]") {
      tmp = new RegExp(x.source, x.flags);
      tmp.lastIndex = x.lastIndex;
      return tmp;
    }
    if (str === "[object DataView]") {
      return new x.constructor(klona(x.buffer));
    }
    if (str === "[object ArrayBuffer]") {
      return x.slice(0);
    }
    if (str.slice(-6) === "Array]") {
      return new x.constructor(x);
    }
    return x;
  }
  class GadgetRecord_ {
    constructor(data) {
      this.__fields = {};
      this.__instantiatedFields = {};
      this.__persistedFields = {};
      this.__touched = false;
      this.empty = false;
      this.__fields = {};
      this.__touched = false;
      this.__instantiatedFields = klona(data) ?? {};
      this.__persistedFields = klona(data) ?? {};
      Object.assign(this.__fields, data);
      if (!data || Object.keys(data).length === 0) {
        this.empty = true;
        this.__fieldKeys = /* @__PURE__ */ new Set();
      } else {
        this.__fieldKeys = new Set(Object.keys(this.__fields));
      }
      const self2 = this;
      const handler = {
        get: (obj, prop) => {
          if (prop in self2 || typeof prop == "symbol") {
            let val = self2[prop];
            if (typeof val == "function") {
              val = val.bind(self2);
            }
            return val;
          } else if (prop in obj) {
            return obj[prop];
          }
        },
        set: (obj, prop, value2) => {
          self2.trackKey(prop);
          obj[prop.toString()] = value2;
          return true;
        }
      };
      return new Proxy(this.__fields, handler);
    }
    /** Makes sure our data keys are all tracked, to avoid repeated runtime object-to-array conversions */
    trackKey(key2) {
      const trackingKey = key2.toString();
      this.__fieldKeys.add(trackingKey);
    }
    /** Helper method to compare values with special handling for Date vs string comparisons in either direction */
    hasValueChanged(current, previous) {
      if (current instanceof Date && typeof previous === "string" || previous instanceof Date && typeof current === "string") {
        const currentDate = current instanceof Date ? current : new Date(current);
        const previousDate = previous instanceof Date ? previous : new Date(previous);
        if (!isNaN(currentDate.getTime()) && !isNaN(previousDate.getTime())) {
          return currentDate.getTime() !== previousDate.getTime();
        }
        return true;
      }
      return !isEqual(current, previous);
    }
    /** Returns true if even a single field has changed */
    hasChanges(tracking = ChangeTracking.SinceLoaded) {
      if (this.__touched)
        return true;
      const diffFields = tracking == ChangeTracking.SinceLoaded ? this.__instantiatedFields : this.__persistedFields;
      return [...this.__fieldKeys].some((key2) => this.hasValueChanged(this.__fields[key2], diffFields[key2]));
    }
    /** Checks if the original constructor data was empty or not */
    isEmpty() {
      return this.empty;
    }
    /** Returns the value of the field for the given `apiIdentifier`. These properties may also be accessed on this record directly. This method can be used if your model field `apiIdentifier` conflicts with the `GadgetRecord` helper functions. */
    getField(apiIdentifier) {
      return this.__fields[apiIdentifier];
    }
    /** Sets the value of the field for the given `apiIdentifier`. These properties may also be accessed on this record directly. This method can be used if your model field `apiIdentifier` conflicts with the `GadgetRecord` helper functions. */
    setField(apiIdentifier, value2) {
      this.trackKey(apiIdentifier);
      return this.__fields[apiIdentifier] = value2;
    }
    changes(prop, tracking = ChangeTracking.SinceLoaded) {
      const trackChangesSince = typeof prop == "string" ? tracking : prop || tracking;
      const diffFields = trackChangesSince == ChangeTracking.SinceLoaded ? this.__instantiatedFields : this.__persistedFields;
      if (prop && typeof prop == "string") {
        const previous = diffFields[prop];
        const current = this.__fields[prop];
        const changed = this.hasValueChanged(current, previous);
        return changed ? { changed, current, previous } : { changed };
      } else {
        const diff = {};
        for (const key2 of this.__fieldKeys) {
          if (!isEqual(diffFields[key2], this.__fields[key2])) {
            diff[key2] = { current: this.__fields[key2], previous: diffFields[key2] };
          }
        }
        return diff;
      }
    }
    /** Returns all current values for fields that have changed */
    toChangedJSON(tracking = ChangeTracking.SinceLoaded) {
      const diffFields = tracking == ChangeTracking.SinceLoaded ? this.__instantiatedFields : this.__persistedFields;
      const current = {};
      for (const key2 of this.__fieldKeys) {
        if (!isEqual(diffFields[key2], this.__fields[key2])) {
          current[key2] = this.__fields[key2];
        }
      }
      return current;
    }
    changed(prop, tracking = ChangeTracking.SinceLoaded) {
      if (prop && typeof prop == "string") {
        return this.changes(prop, tracking).changed;
      } else {
        return this.hasChanges(prop === void 0 ? tracking : prop);
      }
    }
    /** Flushes all `changes` and starts tracking new changes from the current state of the record. */
    flushChanges(tracking = ChangeTracking.SinceLoaded) {
      if (tracking == ChangeTracking.SinceLoaded) {
        this.__instantiatedFields = klona(this.__fields);
      } else if (tracking == ChangeTracking.SinceLastPersisted) {
        this.__persistedFields = klona(this.__fields);
      }
      this.__touched = false;
    }
    /** Reverts all `changes` on the record, and returns to either the values this record were instantiated with, or the values at the time of the last `flushChanges` call. */
    revertChanges(tracking = ChangeTracking.SinceLoaded) {
      let persistedKeys;
      if (tracking == ChangeTracking.SinceLoaded) {
        persistedKeys = Object.keys(this.__instantiatedFields);
      } else {
        persistedKeys = Object.keys(this.__persistedFields);
      }
      for (const key2 of this.__fieldKeys) {
        if (!persistedKeys.includes(key2))
          delete this.__fields[key2];
      }
      if (tracking == ChangeTracking.SinceLoaded) {
        Object.assign(this.__fields, klona(this.__instantiatedFields));
      } else {
        Object.assign(this.__fields, klona(this.__persistedFields));
      }
      this.__touched = false;
    }
    /** Returns a JSON representation of all fields on this record. */
    toJSON() {
      return toPrimitiveObject({ ...this.__fields });
    }
    /** Marks this record as changed so that the next save will save it and adjust any `updatedAt` timestamps */
    touch() {
      this.__touched = true;
    }
  }
  const GadgetRecord = Object.assign(GadgetRecord_, {
    ChangeTracking
  });
  class GadgetInternalError extends Error {
    constructor() {
      super(...arguments);
      this.code = "GGT_INTERNAL_ERROR";
      this.name = "InternalError";
      this.statusCode = 500;
      this.causedByClient = false;
    }
  }
  class GadgetClientError extends Error {
    constructor() {
      super(...arguments);
      this.code = "GGT_CLIENT_ERROR";
      this.name = "ClientError";
      this.statusCode = 500;
      this.causedByClient = true;
    }
  }
  class GadgetOperationError extends Error {
    constructor(incomingMessage, code) {
      super(incomingMessage.startsWith("GGT_") ? incomingMessage : `${code}: ${incomingMessage}`);
      this.code = code;
    }
  }
  class GadgetUnexpectedCloseError extends Error {
    constructor(event) {
      let message;
      if (isCloseEvent(event)) {
        message = `GraphQL websocket closed unexpectedly by the server with error code ${event.code} and reason "${event.reason}"`;
      } else {
        message = "GraphQL websocket closed unexpectedly by the server";
      }
      super(message);
      this.code = "GGT_UNKNOWN";
      this.name = "UnexpectedCloseError";
      this.statusCode = 500;
      this.causedByClient = false;
      this.event = event;
    }
  }
  class GadgetWebsocketConnectionTimeoutError extends Error {
    constructor() {
      super(...arguments);
      this.code = "GGT_WEBSOCKET_CONNECTION_TIMEOUT";
      this.name = "WebsocketConnectionTimeoutError";
      this.statusCode = 500;
      this.causedByClient = false;
    }
  }
  class GadgetTooManyRequestsError extends Error {
    constructor() {
      super(...arguments);
      this.code = "GGT_TOO_MANY_REQUESTS";
      this.name = "TooManyRequestsError";
      this.statusCode = 429;
      this.causedByClient = false;
    }
  }
  class InvalidRecordError extends Error {
    constructor(message, validationErrors, modelApiIdentifier2, record) {
      const firstErrors = validationErrors.slice(0, 3);
      const extraErrorMessage = validationErrors.length > 3 ? `, and ${validationErrors.length - 3} more error${validationErrors.length > 4 ? "s" : ""} need${validationErrors.length > 4 ? "" : "s"} to be corrected` : "";
      super(
        message ?? `GGT_INVALID_RECORD: ${modelApiIdentifier2 ?? "Record"} is invalid and can't be saved. ${firstErrors.map(({ apiIdentifier, message: message2 }) => `${apiIdentifier} ${message2}`).join(", ")}${extraErrorMessage}.`
      );
      this.code = "GGT_INVALID_RECORD";
      this.name = "InvalidRecordError";
      this.statusCode = 422;
      this.causedByClient = true;
      this.validationErrors = validationErrors;
      this.modelApiIdentifier = modelApiIdentifier2;
      this.record = record;
    }
  }
  class GadgetNonUniqueDataError extends Error {
    constructor() {
      super(...arguments);
      this.code = "GGT_NON_UNIQUE_DATA";
      this.name = "NonUniqueDataError";
      this.statusCode = 417;
      this.causedByClient = false;
    }
  }
  class GadgetNotFoundError extends Error {
    constructor() {
      super(...arguments);
      this.code = "GGT_RECORD_NOT_FOUND";
      this.name = "RecordNotFoundError";
      this.statusCode = 404;
      this.causedByClient = false;
    }
  }
  class GadgetErrorGroup extends Error {
    constructor(errors, results) {
      super(errors.length > 1 ? "Multiple errors occurred" : errors[0].message);
      this.errors = errors;
      this.results = results;
      this.name = "ErrorGroup";
    }
    get code() {
      return `GGT_ERROR_GROUP(${this.errors.slice(0, 10).map((error2) => error2.code ?? "GGT_UNKNOWN").join(",")})`;
    }
    /** @private */
    get statusCode() {
      return Math.max(...this.errors.map((error2) => error2.statusCode ?? 500));
    }
  }
  function assert(value2, message) {
    if (!value2) {
      throw new Error("assertion error" + (message ? `: ${message}` : ""));
    }
    return value2;
  }
  const get = (object, path) => {
    const length = path.length;
    let index2 = 0;
    while (object != null && index2 < length) {
      object = object[path[index2++]];
    }
    return index2 && index2 == length ? object : void 0;
  };
  const isCloseEvent = (event) => (event == null ? void 0 : event.type) == "close";
  const capitalizeIdentifier = (str, capitalizeFirstCharacter2) => {
    if (typeof str !== "string")
      return "";
    return camelize(str, capitalizeFirstCharacter2);
  };
  const capitalizeFirstCharacter = (str) => {
    const result = str === null || str === void 0 ? "" : String(str);
    return result.charAt(0).toUpperCase() + result.slice(1);
  };
  const camelize = (term, uppercaseFirstLetter = true) => {
    let result = "" + term;
    if (uppercaseFirstLetter) {
      result = result.replace(/^[a-z\d]*/, (a2) => {
        return capitalizeFirstCharacter(a2);
      });
    } else {
      result = result.replace(new RegExp("^(?:(?=\\b|[A-Z_])|\\w)"), (a2) => {
        return a2.toLowerCase();
      });
    }
    result = result.replace(/(?:_|(\/))([a-z\d]*)/gi, (_match, a2, b, _idx, _string) => {
      a2 || (a2 = "");
      return "" + a2 + capitalizeFirstCharacter(b);
    });
    return result;
  };
  const namespacedGraphQLTypeName = (modelApiIdentifier2, givenNamespaces) => {
    const namespaces = Array.isArray(givenNamespaces) ? givenNamespaces : givenNamespaces ? [givenNamespaces] : [];
    const segments = [...namespaces, modelApiIdentifier2];
    return segments.map((segment) => camelize(segment)).join("");
  };
  const sortTypeName = (modelApiIdentifier2, namespace) => `${namespacedGraphQLTypeName(modelApiIdentifier2, namespace)}Sort`;
  const filterTypeName = (modelApiIdentifier2, namespace) => `${namespacedGraphQLTypeName(modelApiIdentifier2, namespace)}Filter`;
  const searchableFieldTypeName = (modelApiIdentifier2, namespace) => `${namespacedGraphQLTypeName(modelApiIdentifier2, namespace)}SearchFields`;
  const getNonUniqueDataError = (modelApiIdentifier2, fieldName, fieldValue) => new GadgetNonUniqueDataError(
    `More than one record found for ${modelApiIdentifier2}.${fieldName} = ${fieldValue}. Please confirm your unique validation is not reporting an error.`
  );
  const getNonNullableError = (response, dataPath) => {
    if (response.fetching) {
      return;
    }
    const result = get(response.data, dataPath);
    if (result === void 0) {
      return new GadgetInternalError(
        `Internal Error: Gadget API didn't return expected data. Nothing found in response at ${dataPath.join(".")}`
      );
    } else if (result === null) {
      return new GadgetNotFoundError(`Record Not Found Error: Gadget API returned no data at ${dataPath.join(".")}`);
    }
  };
  const assertOperationSuccess = (response, dataPath, throwOnEmptyData = false) => {
    var _a;
    if (response.error) {
      if ("networkError" in response.error && response.error.networkError) {
        if ((_a = response.error.networkError) == null ? void 0 : _a.message) {
          response.error.message = `[Network] ${response.error.networkError.message}`;
        } else {
          response.error.message = `[Network] No message, error: string(response.error.networkError) 
stack: ${String(
            response.error.networkError.stack
          )}}`;
        }
      }
      throw response.error;
    }
    const result = get(response.data, dataPath);
    const edges = get(result, ["edges"]);
    const dataArray = edges ?? result;
    if (result === void 0) {
      throw new GadgetInternalError(
        `Internal Error: Gadget API didn't return expected data. Nothing found in response at ${dataPath.join(".")}`
      );
    } else if (result === null || throwOnEmptyData && Array.isArray(dataArray) && dataArray.length === 0) {
      throw new GadgetNotFoundError(`Record Not Found Error: Gadget API returned no data at ${dataPath.join(".")}`);
    }
    return result;
  };
  const assertNullableOperationSuccess = (response, dataPath) => {
    var _a;
    if (response.error) {
      if ("networkError" in response.error && ((_a = response.error.networkError) == null ? void 0 : _a.length)) {
        response.error.message = response.error.networkError.map((error2) => "[Network] " + error2.message).join("\n");
      }
      throw response.error;
    }
    const result = get(response.data, dataPath);
    return result ?? null;
  };
  const gadgetErrorFor = (error2) => {
    var _a;
    if (error2.code == "GGT_INVALID_RECORD") {
      return new InvalidRecordError(error2.message, error2.validationErrors, (_a = error2.model) == null ? void 0 : _a.apiIdentifier, error2.record);
    } else if (error2.code == "GGT_UNKNOWN" && error2.message.includes("duplicate key value violates unique constraint")) {
      return new GadgetNonUniqueDataError(error2.message);
    } else {
      return new GadgetOperationError(error2.message, error2.code);
    }
  };
  const assertMutationSuccess = (response, dataPath) => {
    const operationResponse = assertOperationSuccess(response, dataPath);
    return assertResponseSuccess(operationResponse);
  };
  const assertResponseSuccess = (operationResponse) => {
    if (!operationResponse.success) {
      const firstErrorBlob = operationResponse.errors && operationResponse.errors[0];
      if (firstErrorBlob) {
        throw gadgetErrorFor(firstErrorBlob);
      } else {
        throw new GadgetOperationError(`Gadget API operation not successful.`, "GGT_UNKNOWN");
      }
    }
    return operationResponse;
  };
  const getHydrator = (response) => {
    var _a, _b, _c, _d;
    if ((_b = (_a = response.data) == null ? void 0 : _a.gadgetMeta) == null ? void 0 : _b.hydrations) {
      return new DataHydrator((_d = (_c = response.data) == null ? void 0 : _c.gadgetMeta) == null ? void 0 : _d.hydrations);
    }
  };
  const hydrateRecord = (response, record) => {
    const hydrator = getHydrator(response);
    if (hydrator) {
      record = hydrator.apply(record);
    }
    return new GadgetRecord(record);
  };
  const hydrateRecordArray = (response, records2) => {
    const hydrator = getHydrator(response);
    if (hydrator) {
      records2 = hydrator.apply(records2);
    }
    return records2 == null ? void 0 : records2.map((record) => new GadgetRecord(record));
  };
  const hydrateConnection = (response, connection) => {
    const nodes = connection.edges.map((edge) => edge.node);
    return hydrateRecordArray(response, nodes);
  };
  const objObjType = "[object Object]";
  const stringObjType = "[object String]";
  const toPrimitiveObject = (value2) => {
    if (value2 != null && typeof value2.toJSON === "function")
      value2 = value2.toJSON();
    if (value2 === void 0)
      return void 0;
    if (value2 === null)
      return null;
    if (typeof value2 === "boolean")
      return value2;
    if (typeof value2 === "string")
      return value2;
    if (typeof value2 === "number")
      return Number.isFinite(value2) ? value2 : null;
    if (typeof value2 === "object") {
      if (Array.isArray(value2)) {
        const arr = [];
        for (let i2 = 0; i2 < value2.length; i2++) {
          const v2 = value2[i2];
          arr[i2] = v2 === void 0 ? null : toPrimitiveObject(v2);
        }
        return arr;
      }
      if (Object.prototype.toString.call(value2) === "[object Error]")
        return {};
      if (Object.prototype.toString.call(value2) === objObjType) {
        const obj = {};
        for (const key2 of Object.keys(value2)) {
          const parsed = toPrimitiveObject(value2[key2]);
          if (parsed !== void 0)
            obj[key2] = parsed;
        }
        return obj;
      }
    }
  };
  const key = "gstk";
  const storageAvailable = (type2) => {
    try {
      const storage = window[type2];
      storage.setItem(key, key);
      storage.removeItem(key);
      return true;
    } catch (e2) {
      return false;
    }
  };
  const toString = Object.prototype.toString, getPrototypeOf = Object.getPrototypeOf, getOwnProperties = Object.getOwnPropertySymbols ? (c2) => Object.keys(c2).concat(Object.getOwnPropertySymbols(c2)) : Object.keys;
  const checkEquality = (a2, b, refs) => {
    if (a2 === b)
      return true;
    if (a2 == null || b == null)
      return false;
    if (refs.indexOf(a2) > -1 && refs.indexOf(b) > -1)
      return true;
    const aType = toString.call(a2);
    const bType = toString.call(b);
    let aElements, bElements, element;
    refs.push(a2, b);
    if (aType == objObjType && bType == stringObjType && "_link" in a2 && Object.keys(a2).length == 1) {
      return a2._link === b;
    } else if (bType == objObjType && aType == stringObjType && "_link" in b && Object.keys(b).length == 1) {
      return b._link === a2;
    }
    if (aType != bType)
      return false;
    aElements = getOwnProperties(a2);
    bElements = getOwnProperties(b);
    if (aElements.length != bElements.length || aElements.some(function(key2) {
      return !checkEquality(a2[key2], b[key2], refs);
    })) {
      return false;
    }
    switch (aType.slice(8, -1)) {
      case "Symbol":
        return a2.valueOf() == b.valueOf();
      case "Date":
      case "Number":
        return +a2 == +b || +a2 != +a2 && +b != +b;
      case "RegExp":
      case "Function":
      case "String":
      case "Boolean":
        return "" + a2 == "" + b;
      case "Set":
      case "Map": {
        aElements = a2.entries();
        bElements = b.entries();
        do {
          element = aElements.next();
          if (!checkEquality(element.value, bElements.next().value, refs)) {
            return false;
          }
        } while (!element.done);
        return true;
      }
      case "ArrayBuffer":
        a2 = new Uint8Array(a2), b = new Uint8Array(b);
      case "DataView":
        a2 = new Uint8Array(a2.buffer), b = new Uint8Array(b.buffer);
      case "Float32Array":
      case "Float64Array":
      case "Int8Array":
      case "Int16Array":
      case "Int32Array":
      case "Uint8Array":
      case "Uint16Array":
      case "Uint32Array":
      case "Uint8ClampedArray":
      case "Arguments":
      case "Array":
        if (a2.length != b.length)
          return false;
        for (element = 0; element < a2.length; element++) {
          if (!(element in a2) && !(element in b))
            continue;
          if (element in a2 != element in b || !checkEquality(a2[element], b[element], refs))
            return false;
        }
        return true;
      case "Object":
        return checkEquality(getPrototypeOf(a2), getPrototypeOf(b), refs);
      default:
        return false;
    }
  };
  const isEqual = (a2, b) => checkEquality(a2, b, []);
  const isPlainObject = (value2) => {
    if (typeof value2 !== "object" || value2 === null)
      return false;
    if (Object.prototype.toString.call(value2) !== "[object Object]")
      return false;
    const proto = Object.getPrototypeOf(value2);
    if (proto === null)
      return true;
    const Ctor = Object.prototype.hasOwnProperty.call(proto, "constructor") && proto.constructor;
    return typeof Ctor === "function" && Ctor instanceof Ctor && Function.prototype.call(Ctor) === Function.prototype.call(value2);
  };
  const disambiguateActionVariables = (action, variables) => {
    var _a;
    variables ?? (variables = {});
    if (!("hasAmbiguousIdentifier" in action) && !("acceptsModelInput" in action))
      return variables;
    if (action.hasAmbiguousIdentifier) {
      if (Object.keys(variables).some((key2) => {
        var _a2;
        return key2 !== "id" && !((_a2 = action.paramOnlyVariables) == null ? void 0 : _a2.includes(key2)) && key2 !== action.modelApiIdentifier;
      })) {
        throw Error(`Invalid arguments found in variables. Did you mean to use ({ ${action.modelApiIdentifier}: { ... } })?`);
      }
    }
    let newVariables;
    const shouldExtractId = action.operatesWithRecordIdentity ?? true;
    if (action.acceptsModelInput ?? action.hasCreateOrUpdateEffect) {
      if (action.modelApiIdentifier in variables && typeof variables[action.modelApiIdentifier] === "object" && variables[action.modelApiIdentifier] != null) {
        newVariables = variables;
      } else {
        newVariables = {
          [action.modelApiIdentifier]: /* @__PURE__ */ Object.create(null)
        };
        for (const [key2, value2] of Object.entries(variables)) {
          if ((_a = action.paramOnlyVariables) == null ? void 0 : _a.includes(key2)) {
            newVariables[key2] = value2;
          } else {
            if (key2 == "id" && shouldExtractId) {
              newVariables.id = value2;
            } else {
              newVariables[action.modelApiIdentifier][key2] = value2;
            }
          }
        }
      }
    } else {
      newVariables = variables;
    }
    return newVariables;
  };
  const disambiguateBulkActionVariables = (action, inputs = {}) => {
    if (action.variables["ids"]) {
      return Array.isArray(inputs) ? { ids: inputs } : inputs;
    } else {
      const inputsArray = (Array.isArray(inputs) ? inputs : inputs.inputs) ?? [];
      return {
        inputs: inputsArray.map((input) => disambiguateActionVariables(action, input))
      };
    }
  };
  const setVariableOptionValues = (variableOptions, values) => {
    const result = {};
    for (const [key2, variable] of Object.entries(variableOptions)) {
      const value2 = key2 in values ? values[key2] : variable.value;
      result[key2] = { ...variable, value: value2 };
    }
    return result;
  };
  const namespaceDataPath = (dataPath, namespace) => {
    if (namespace) {
      dataPath.unshift(...Array.isArray(namespace) ? namespace : [namespace]);
    }
    return dataPath;
  };
  function namespacify(namespace, fields) {
    if (!namespace)
      return fields;
    if (!Array.isArray(namespace)) {
      namespace = [namespace];
    }
    if (namespace) {
      for (let i2 = namespace.length - 1; i2 >= 0; i2--) {
        fields = {
          [namespace[i2]]: fields
        };
      }
    }
    return fields;
  }
  const ErrorsSelection = {
    errors: {
      message: true,
      code: true,
      "... on InvalidRecordError": {
        model: {
          apiIdentifier: true
        },
        validationErrors: {
          message: true,
          apiIdentifier: true
        }
      }
    }
  };
  const jsSearchFieldsToGqlSearchFields = (searchFields) => {
    const result = {};
    for (const [field, config2] of Object.entries(searchFields)) {
      if (config2 === null || config2 === void 0 || config2 === false) {
        continue;
      }
      if (isPlainObject(config2)) {
        const hasScalarProperties = Object.values(config2).some(
          (v2) => !isPlainObject(v2) && v2 !== true && v2 !== null && v2 !== void 0 && v2 !== false
        );
        if (hasScalarProperties) {
          const fieldConfig = {};
          for (const [key2, value2] of Object.entries(config2)) {
            if (value2 === null || value2 === void 0 || value2 === false) {
              continue;
            }
            if (isPlainObject(value2)) {
              fieldConfig[key2] = jsSearchFieldsToGqlSearchFields(value2);
            } else if (value2 === true) {
              fieldConfig[key2] = {};
            } else {
              fieldConfig[key2] = value2;
            }
          }
          result[field] = fieldConfig;
        } else {
          result[field] = jsSearchFieldsToGqlSearchFields(config2);
        }
      } else if (config2 === true) {
        result[field] = {};
      }
    }
    return result;
  };
  const processBulkActionResponse = (defaultSelection, response, records2, modelSelectionField, hasReturnType) => {
    if (defaultSelection == null)
      return;
    if (!hasReturnType) {
      return hydrateRecordArray(response, records2[modelSelectionField]);
    } else if (typeof hasReturnType == "boolean") {
      return records2.results;
    } else {
      return Object.entries(hasReturnType).flatMap(([returnTypeField, innerHasReturnType]) => {
        const results = records2[returnTypeField];
        if (!Array.isArray(results)) {
          return [];
        }
        return results.map((result) => {
          const returnTypeForResult = "hasReturnType" in innerHasReturnType ? returnTypeForRecord(result, innerHasReturnType.hasReturnType) : false;
          if (!returnTypeForResult) {
            return hydrateRecord(response, result);
          } else {
            return processActionResponse(defaultSelection, response, result, modelSelectionField, returnTypeForResult);
          }
        });
      });
    }
  };
  const processActionResponse = (defaultSelection, response, record, modelSelectionField, hasReturnType) => {
    if (defaultSelection == null)
      return;
    if (!hasReturnType) {
      return hydrateRecord(response, record[modelSelectionField]);
    } else if (typeof hasReturnType == "boolean") {
      return record.result;
    } else {
      const innerReturnType = returnTypeForRecord(record, hasReturnType);
      return processActionResponse(defaultSelection, response, record, modelSelectionField, innerReturnType);
    }
  };
  const returnTypeForRecord = (record, hasReturnType) => {
    if (typeof hasReturnType == "boolean") {
      return hasReturnType;
    }
    const innerReturnTypeForTypename = hasReturnType[`... on ${record.__typename}`];
    return innerReturnTypeForTypename && "hasReturnType" in innerReturnTypeForTypename ? innerReturnTypeForTypename.hasReturnType : false;
  };
  const hydrationSelection = (modelApiIdentifier2, namespace) => {
    const fullyQualifiedIdentifier = namespace ? [...Array.isArray(namespace) ? namespace : [namespace], modelApiIdentifier2].join(".") : modelApiIdentifier2;
    return {
      gadgetMeta: {
        hydrations: Call({ modelName: fullyQualifiedIdentifier })
      }
    };
  };
  const $args = Symbol.for("gadget/fieldArgs");
  const expandSelection = (selection, defaultSelection) => {
    const result = {};
    for (const [key2, value2] of Object.entries(selection)) {
      const defaultValue = defaultSelection[key2];
      if (value2 === true && defaultValue != null && typeof defaultValue === "object") {
        result[key2] = defaultValue;
      } else {
        result[key2] = value2;
      }
    }
    return result;
  };
  const selectionValueToBuilderValue = (value2) => {
    if (typeof value2 !== "object" || value2 === null) {
      return value2;
    }
    const fieldArgs = value2[$args];
    const stringKeys = Object.keys(value2);
    const nestedSelection = {};
    for (const key2 of stringKeys) {
      nestedSelection[key2] = selectionValueToBuilderValue(value2[key2]);
    }
    if (fieldArgs != null) {
      return stringKeys.length > 0 ? Call(fieldArgs, nestedSelection) : Call(fieldArgs);
    }
    return nestedSelection;
  };
  const fieldSelectionToQueryCompilerFields = (selection, includeTypename = false) => {
    const output = {};
    for (const [key2, value2] of Object.entries(selection)) {
      output[key2] = selectionValueToBuilderValue(value2);
    }
    if (includeTypename)
      output.__typename = true;
    return output;
  };
  const directivesForOptions = (options) => {
    if (options == null ? void 0 : options.live)
      return ["@live"];
    return void 0;
  };
  const findOneOperation = (operation, id, defaultSelection, modelApiIdentifier2, options, namespace) => {
    const variables = {};
    if (typeof id !== "undefined")
      variables.id = Var({ type: "GadgetID!", value: id });
    let fields = {
      [operation]: Call(
        variables,
        fieldSelectionToQueryCompilerFields((options == null ? void 0 : options.select) ? expandSelection(options.select, defaultSelection) : defaultSelection, true)
      )
    };
    fields = namespacify(namespace, fields);
    return compileWithVariableValues({
      type: "query",
      name: operation,
      fields: {
        ...fields,
        ...hydrationSelection(modelApiIdentifier2, namespace)
      },
      directives: directivesForOptions(options)
    });
  };
  const findOneByFieldOperation = (operation, fieldName, fieldValue, defaultSelection, modelApiIdentifier2, options, namespace) => {
    return findManyOperation(
      operation,
      defaultSelection,
      modelApiIdentifier2,
      {
        ...options,
        first: 2,
        filter: {
          [fieldName]: {
            equals: fieldValue
          }
        }
      },
      namespace
    );
  };
  const findManyOperation = (operation, defaultSelection, modelApiIdentifier2, options, namespace) => {
    let fields = {
      [operation]: Call(
        {
          after: Var({ value: options == null ? void 0 : options.after, type: "String" }),
          first: Var({ value: options == null ? void 0 : options.first, type: "Int" }),
          before: Var({ value: options == null ? void 0 : options.before, type: "String" }),
          last: Var({ value: options == null ? void 0 : options.last, type: "Int" }),
          sort: (options == null ? void 0 : options.sort) ? Var({ value: options.sort, type: `[${sortTypeName(modelApiIdentifier2, namespace)}!]` }) : void 0,
          filter: (options == null ? void 0 : options.filter) ? Var({ value: options.filter, type: `[${filterTypeName(modelApiIdentifier2, namespace)}!]` }) : void 0,
          search: (options == null ? void 0 : options.search) ? Var({ value: options.search, type: "String" }) : void 0,
          searchFields: (options == null ? void 0 : options.searchFields) ? Var({
            value: jsSearchFieldsToGqlSearchFields(options.searchFields),
            type: `${searchableFieldTypeName(modelApiIdentifier2, namespace)}`
          }) : void 0
        },
        {
          pageInfo: { hasNextPage: true, hasPreviousPage: true, startCursor: true, endCursor: true },
          edges: {
            cursor: true,
            node: fieldSelectionToQueryCompilerFields(
              (options == null ? void 0 : options.select) ? expandSelection(options.select, defaultSelection) : defaultSelection,
              true
            )
          }
        }
      )
    };
    if (namespace) {
      fields = namespacify(namespace, fields);
    }
    return compileWithVariableValues({
      type: "query",
      name: operation,
      fields: {
        ...fields,
        ...hydrationSelection(modelApiIdentifier2, namespace)
      },
      directives: directivesForOptions(options)
    });
  };
  const variableOptionsToVariables = (variables) => {
    return Object.fromEntries(Object.entries(variables).map(([name2, options]) => [name2, Var(options)]));
  };
  const actionResultFieldSelection = (modelSelectionField, selection, isBulkAction, hasReturnType, depth = 0) => {
    const fieldSelection = depth == 0 ? {
      success: true,
      ...ErrorsSelection
    } : {};
    if (hasReturnType && typeof hasReturnType != "boolean") {
      for (const [selectionField, returnTypeSelection] of Object.entries(hasReturnType)) {
        if ("select" in returnTypeSelection) {
          fieldSelection[selectionField] = fieldSelectionToQueryCompilerFields(selection, true);
        } else {
          fieldSelection[selectionField] = {
            __typename: selectionField.includes("... on"),
            ...actionResultFieldSelection(modelSelectionField, selection, isBulkAction, returnTypeSelection.hasReturnType, depth + 1)
          };
        }
      }
    } else if (hasReturnType) {
      fieldSelection[isBulkAction && depth == 0 ? "results" : "result"] = true;
    } else if (selection) {
      fieldSelection[modelSelectionField] = fieldSelectionToQueryCompilerFields(selection, true);
    }
    return fieldSelection;
  };
  const actionOperation = (operation, defaultSelection, modelApiIdentifier2, modelSelectionField, variables, options, namespace, isBulkAction, hasReturnType) => {
    const selection = (options == null ? void 0 : options.select) ? expandSelection(options.select, defaultSelection ?? {}) : defaultSelection;
    let fields = {
      [operation]: Call(
        variableOptionsToVariables(variables),
        actionResultFieldSelection(modelSelectionField, selection, isBulkAction, hasReturnType)
      )
    };
    fields = namespacify(namespace, fields);
    const actionOperation2 = {
      type: "mutation",
      name: operation,
      fields: {
        ...fields,
        ...hydrationSelection(modelApiIdentifier2, namespace)
      },
      directives: directivesForOptions(options)
    };
    return compileWithVariableValues(actionOperation2);
  };
  const backgroundActionResultOperation = (id, action, options) => {
    let fields = {};
    let resultType;
    const backgroundAction = action.isBulk && action.singleAction ? action.singleAction : action;
    let operationName = backgroundAction.operationName;
    if (backgroundAction.isBulk) {
      operationName = backgroundAction.operationName.replace(/^bulk/, "").replace(/s$/, "");
    }
    if (!backgroundAction.operationReturnType) {
      resultType = `${camelize(operationName)}Result`;
    } else {
      resultType = `${backgroundAction.operationReturnType}Result`;
    }
    switch (backgroundAction.type) {
      case "action": {
        const selection = (options == null ? void 0 : options.select) ? expandSelection(options.select, backgroundAction.defaultSelection ?? {}) : backgroundAction.defaultSelection;
        fields = {
          [`... on ${resultType}`]: actionResultFieldSelection(
            backgroundAction.modelApiIdentifier,
            selection,
            backgroundAction.isBulk,
            backgroundAction.hasReturnType
          )
        };
        break;
      }
      case "globalAction": {
        fields = {
          [`... on ${resultType}`]: globalActionFieldSelection()
        };
      }
    }
    const actionResultOperation2 = {
      type: "subscription",
      name: capitalizeIdentifier(operationName) + "BackgroundResult",
      fields: {
        backgroundAction: Call(
          { id: Var({ value: id, type: "String!" }) },
          {
            id: true,
            outcome: true,
            result: {
              ...fields
            }
          }
        )
      }
    };
    return compileWithVariableValues(actionResultOperation2);
  };
  const globalActionFieldSelection = () => {
    return {
      success: true,
      ...ErrorsSelection,
      result: true
    };
  };
  const globalActionOperation = (operation, variables, namespace, options) => {
    let fields = {
      [operation]: Call(variableOptionsToVariables(variables), globalActionFieldSelection())
    };
    fields = namespacify(namespace, fields);
    return compileWithVariableValues({
      type: "mutation",
      name: operation,
      fields,
      directives: directivesForOptions(options)
    });
  };
  const graphqlizeBackgroundOptions = (options) => {
    if (!options)
      return null;
    const obj = { ...options };
    if (typeof obj.retries == "number") {
      obj.retries = {
        retryCount: obj.retries
      };
    }
    if (typeof obj.queue == "string") {
      obj.queue = {
        name: obj.queue
      };
    }
    if (obj.startAt instanceof Date) {
      obj.startAt = obj.startAt.toISOString();
    }
    if (obj.priority) {
      obj.priority = obj.priority.toUpperCase();
    }
    for (const key2 of Object.keys(obj)) {
      if (["id", "retries", "queue", "priority", "startAt", "shopifyShop"].includes(key2))
        continue;
      delete obj[key2];
    }
    return obj;
  };
  const enqueueActionOperation = (operation, variables, namespace, options, isBulk) => {
    let fields = {
      [operation]: Call(
        {
          ...variableOptionsToVariables(variables),
          backgroundOptions: Var({
            type: "EnqueueBackgroundActionOptions",
            value: graphqlizeBackgroundOptions(options)
          })
        },
        {
          success: true,
          errors: {
            message: true,
            code: true
          },
          [isBulk ? "backgroundActions" : "backgroundAction"]: {
            id: true
          }
        }
      )
    };
    fields = namespacify(namespace, fields);
    return compileWithVariableValues({
      type: "mutation",
      name: "enqueue" + camelize(operation),
      fields: {
        background: fields
      }
    });
  };
  const cancelBackgroundActionOperation = (id) => {
    const fields = {
      cancel: Call(
        { id: Var({ value: id, type: "String!" }) },
        {
          success: true,
          errors: {
            code: true,
            message: true
          },
          backgroundAction: {
            id: true
          }
        }
      )
    };
    return compileWithVariableValues({
      type: "mutation",
      name: "cancelBackgroundAction",
      fields: {
        background: fields
      }
    });
  };
  const getBackgroundActionStatusOperation = (id) => {
    const statusOperation = {
      type: "subscription",
      name: "BackgroundActionStatus",
      fields: {
        backgroundAction: Call(
          { id: Var({ value: id, type: "String!" }) },
          {
            id: true,
            status: true
          }
        )
      }
    };
    return compileWithVariableValues(statusOperation);
  };
  const computedViewOperation = (gqlFieldName, variablesOptions = {}, namespace) => {
    let fields = {
      [gqlFieldName]: Call(variableOptionsToVariables(variablesOptions))
    };
    if (namespace) {
      fields = namespacify(namespace, fields);
    }
    return variablesOptions ? compileWithVariableValues({ type: "query", name: gqlFieldName, fields }) : { query: compile({ type: "query", name: gqlFieldName, fields }), variables: {} };
  };
  const inlineComputedViewOperation = (query, gqlFieldName, variables, namespace) => {
    const vars = {
      query: Var({ type: "String", value: query, required: true })
    };
    if (variables)
      vars["variables"] = Var({ type: "JSONObject", value: variables });
    let fields = {
      [gqlFieldName]: Call(variableOptionsToVariables(vars))
    };
    if (namespace)
      fields = namespacify(namespace, fields);
    return compileWithVariableValues({ type: "query", name: gqlFieldName, fields });
  };
  const backgroundActionResultRunner = async (connection, id, action, options) => {
    const plan = backgroundActionResultOperation(id, action, options);
    const subscription = connection.currentClient.subscription(plan.query, plan.variables);
    const response = await pipe(
      subscription,
      filter((operation) => {
        var _a, _b;
        return operation.error || ((_b = (_a = operation.data) == null ? void 0 : _a.backgroundAction) == null ? void 0 : _b.outcome);
      }),
      take(1),
      toPromise
    );
    const backgroundAction = assertOperationSuccess(response, ["backgroundAction"]);
    assertResponseSuccess(backgroundAction.result);
    switch (action.type) {
      case "action": {
        backgroundAction.result = processActionResponse(
          action.defaultSelection,
          response.data,
          backgroundAction.result,
          action.isBulk ? action.modelApiIdentifier : action.modelSelectionField,
          action.hasReturnType
        );
        break;
      }
      case "globalAction": {
        backgroundAction.result = backgroundAction.result.result;
        break;
      }
    }
    return backgroundAction;
  };
  const cancelBackgroundActionRunner = async (connection, id) => {
    const plan = cancelBackgroundActionOperation(id);
    const response = await connection.currentClient.mutation(plan.query, plan.variables).toPromise();
    assertMutationSuccess(response, ["background", "cancel"]);
  };
  const getBackgroundActionStatusRunner = async (connection, id) => {
    const plan = getBackgroundActionStatusOperation(id);
    const subscription = connection.currentClient.subscription(plan.query, plan.variables);
    const response = await pipe(
      subscription,
      filter((result) => !result.stale && !result.hasNext),
      take(1),
      toPromise
    );
    const backgroundAction = assertOperationSuccess(response, ["backgroundAction"]);
    return backgroundAction.status;
  };
  class BackgroundActionHandle {
    constructor(connection, action, id) {
      this.connection = connection;
      this.action = action;
      this.id = id;
    }
    /** Wait for this background action to complete and return the result. */
    async result(options) {
      return (await backgroundActionResultRunner(this.connection, this.id, this.action, options)).result;
    }
    /** Cancel this background action by id. */
    async cancel() {
      await cancelBackgroundActionRunner(this.connection, this.id);
    }
    /** Get the current status of this background action. */
    async status() {
      return await getBackgroundActionStatusRunner(this.connection, this.id);
    }
  }
  class ErrorWrapper extends Error {
    constructor({
      networkError,
      executionErrors,
      response
    }) {
      const normalizedExecutionErrors = (executionErrors || []).map(rehydrateGraphQlError);
      const message = generateErrorMessage(networkError, normalizedExecutionErrors);
      super(message);
      this.message = message;
      this.executionErrors = normalizedExecutionErrors;
      this.graphQLErrors = normalizedExecutionErrors;
      this.networkError = networkError;
      this.response = response;
    }
    /** @private */
    static forClientSideError(error2, response) {
      return new ErrorWrapper({
        executionErrors: [error2],
        response
      });
    }
    /** @private */
    static forErrorsResponse(errors, response) {
      return new ErrorWrapper({
        executionErrors: errors.map(gadgetErrorFor),
        response
      });
    }
    /** @private */
    static forMaybeCombinedError(error2) {
      if (!error2)
        return void 0;
      return new ErrorWrapper({
        networkError: error2.networkError,
        executionErrors: error2.graphQLErrors,
        response: error2.response
      });
    }
    /** @private */
    static errorIfDataAbsent(result, dataPath, paused = false) {
      const nonNullableError = getNonNullableError(result, dataPath);
      let error2 = ErrorWrapper.forMaybeCombinedError(result.error);
      if (!error2 && nonNullableError && !paused) {
        error2 = ErrorWrapper.forClientSideError(nonNullableError);
      }
      return error2;
    }
    /** Class name of this error -- always `ErrorWrapper` */
    get name() {
      return "ErrorWrapper";
    }
    toString() {
      return this.message;
    }
    /**
     * A list of errors the backend reported for specific fields being invalid for the records touched by an action. Is a shortcut for accessing the validation errors of a `GadgetInvalidRecordError` if that's what is in the `executionErrors`.
     **/
    get validationErrors() {
      const firstInvalidRecordError = this.executionErrors.find((err) => err.code == "GGT_INVALID_RECORD");
      return (firstInvalidRecordError == null ? void 0 : firstInvalidRecordError.validationErrors) ?? null;
    }
  }
  const rehydrateGraphQlError = (error2) => {
    if (typeof error2 === "string") {
      return new GraphQLError(error2);
    } else if ((error2 == null ? void 0 : error2.message) && !error2.code) {
      return new GraphQLError(error2.message, error2.nodes, error2.source, error2.positions, error2.path, error2, error2.extensions || {});
    } else {
      return error2;
    }
  };
  const generateErrorMessage = (networkErr, graphQlErrs) => {
    let error2 = "";
    if (networkErr !== void 0) {
      error2 = `[Network] ${networkErr.message}`;
    } else if (graphQlErrs !== void 0) {
      graphQlErrs.forEach((err) => {
        error2 += `[GraphQL] ${err.message}
`;
      });
    } else {
      error2 = "Unknown error";
    }
    return error2.trim();
  };
  const liveQueryExchange = ({ forward }) => {
    const executed = /* @__PURE__ */ new Set();
    const getOperationId = (op) => {
      return op.key;
    };
    return (operations$) => {
      const notLive = pipe(
        operations$,
        filter((op) => !op.query.definitions.some(isLiveQueryOperationDefinitionNode))
      );
      const live = pipe(
        operations$,
        filter((op) => op.query.definitions.some(isLiveQueryOperationDefinitionNode)),
        filter((op) => {
          const opId = getOperationId(op);
          return !executed.has(opId) || op.kind !== "query";
        }),
        onPush((op) => {
          const opId = getOperationId(op);
          if (op.kind === "query") {
            executed.add(opId);
          } else if (op.kind === "teardown") {
            executed.delete(opId);
          }
        })
      );
      return forward(merge([live, notLive]));
    };
  };
  const getLiveDirectiveNode = (input) => {
    var _a;
    if (input.kind !== Kind.OPERATION_DEFINITION || input.operation !== OperationTypeNode.QUERY) {
      return null;
    }
    return (_a = input.directives) == null ? void 0 : _a.find((d2) => d2.name.value === "live");
  };
  const isLiveQueryOperationDefinitionNode = (input) => {
    return !!getLiveDirectiveNode(input);
  };
  const graphqlDocumentName = (doc) => {
    const lastDefinition = [...doc.definitions].reverse().find((definition) => definition.kind == Kind.OPERATION_DEFINITION);
    if (lastDefinition) {
      if (lastDefinition.name) {
        return lastDefinition.name.value;
      }
      const firstSelection = lastDefinition.selectionSet.selections.find((node) => node.kind == Kind.FIELD);
      return firstSelection.name.value;
    }
  };
  const operationNameExchange = mapExchange({
    onOperation: (operation) => {
      var _a;
      (_a = operation.context).operationName ?? (_a.operationName = graphqlDocumentName(operation.query) || "unknown");
    }
  });
  const addUrlParams = (url, paramsToAdd) => {
    const [start2, params2] = url.split("?");
    const paramsObj = new URLSearchParams(params2);
    for (const [key2, value2] of Object.entries(paramsToAdd)) {
      paramsObj.set(key2, value2);
    }
    return `${start2}?${paramsObj.toString()}`;
  };
  const urlParamExchange = mapExchange({
    onOperation: (operation) => {
      if (operation.context.url && operation.context.operationName) {
        try {
          operation.context.url = addUrlParams(operation.context.url, { kind: operation.kind, operation: operation.context.operationName });
        } catch (error2) {
        }
      }
    }
  });
  class TransactionRolledBack extends Error {
  }
  class GadgetTransaction {
    constructor(client, subscriptionClient) {
      this.client = client;
      this.subscriptionClient = subscriptionClient;
      this.open = false;
    }
    /** Shut down this transaction by closing the connection to the backend. */
    close() {
      if (this.open) {
        void this.rollback().catch(() => null);
      }
      void this.subscriptionClient.dispose();
    }
    /** Explicitly roll back this transaction, preventing any of the changes made during it from being committed. */
    async rollback() {
      assertOperationSuccess(await this.client.mutation(`mutation RollbackTransaction { internal { rollbackTransaction }}`, {}).toPromise(), [
        "internal",
        "rollbackTransaction"
      ]);
      this.open = false;
      throw new TransactionRolledBack("Transaction rolled back.");
    }
    /**
     * @private
     */
    async start() {
      assertOperationSuccess(await this.client.mutation(`mutation StartTransaction { internal { startTransaction }}`, {}).toPromise(), [
        "internal",
        "startTransaction"
      ]);
      this.open = true;
    }
    /**
     * @private
     */
    async commit() {
      assertOperationSuccess(await this.client.mutation(`mutation CommitTransaction { internal { commitTransaction }}`, {}).toPromise(), [
        "internal",
        "commitTransaction"
      ]);
      this.open = false;
    }
  }
  class InMemoryStorage {
    constructor() {
      this.values = {};
    }
    getItem(key2) {
      return this.values[key2] || null;
    }
    setItem(key2, value2) {
      this.values[key2] = value2;
    }
  }
  const DEFAULT_CONN_ATTEMPTS = 3;
  const DEFAULT_CONN_ACK_TIMEOUT = 4800;
  const DEFAULT_CONN_GLOBAL_TIMEOUT = 1e4;
  const WS_CLOSE_GOING_AWAY = 1001;
  const RETRYABLE_CLOSE_CODES = [
    CloseCode.ConnectionAcknowledgementTimeout,
    CloseCode.ConnectionInitialisationTimeout,
    WS_CLOSE_GOING_AWAY,
    4294
    /* TooManyRequests */
  ];
  function calculateRetryDelay(attempt) {
    const baseDelay = 500 * Math.pow(2, attempt - 1);
    const jitterFactor = 0.75 + Math.random() * 0.5;
    return Math.round(baseDelay * jitterFactor);
  }
  const $gadgetConnection = Symbol.for("gadget/connection");
  const sessionStorageKey = "token";
  const base64 = typeof btoa !== "undefined" ? btoa : (str) => Buffer.from(str).toString("base64");
  const objectForGlobals = typeof globalThis != "undefined" ? globalThis : typeof window != "undefined" ? window : void 0;
  class GadgetConnection {
    constructor(options) {
      this.options = options;
      this.currentTransaction = null;
      this.authenticationMode = AuthenticationMode.Anonymous;
      this.transaction = async (optionsOrRun, maybeRun) => {
        let run;
        let options2;
        if (maybeRun) {
          run = maybeRun;
          options2 = optionsOrRun;
        } else {
          run = optionsOrRun;
          options2 = {};
        }
        if (this.currentTransaction) {
          return await run(this.currentTransaction);
        }
        let subscriptionClient = null;
        let transaction;
        try {
          subscriptionClient = await this.waitForOpenedConnection({
            isFatalConnectionProblem(errorOrCloseEvent) {
              console.warn("Transport error encountered during transaction processing", errorOrCloseEvent);
              return true;
            },
            connectionAckWaitTimeout: DEFAULT_CONN_ACK_TIMEOUT,
            ...options2,
            urlParams: {
              ...options2.urlParams,
              transaction: "1"
            },
            lazy: false,
            // super ultra critical option that ensures graphql-ws doesn't automatically close the websocket connection when there are no outstanding operations. this is key so we can start a transaction then make mutations within it
            lazyCloseTimeout: 1e5,
            retryAttempts: 0
          });
          const client = new C({
            url: "/-",
            // not used because there's no fetch exchange, set for clarity
            requestPolicy: "network-only",
            // skip any cached data during transactions
            exchanges: [
              ...this.exchanges.beforeAll,
              operationNameExchange,
              ...this.exchanges.beforeAsync,
              subscriptionExchange({
                forwardSubscription(request) {
                  const input = { ...request, query: request.query || "" };
                  return {
                    subscribe: (sink) => {
                      const dispose = subscriptionClient.subscribe(input, sink);
                      return {
                        unsubscribe: dispose
                      };
                    }
                  };
                },
                enableAllOperations: true
              }),
              ...this.exchanges.afterAll
            ]
          });
          client[$gadgetConnection] = this;
          transaction = new GadgetTransaction(client, subscriptionClient);
          this.currentTransaction = transaction;
          await transaction.start();
          const result = await run(transaction);
          await transaction.commit();
          return result;
        } catch (error2) {
          try {
            if (transaction == null ? void 0 : transaction.open)
              await transaction.rollback();
          } catch (rollbackError) {
            if (!(rollbackError instanceof TransactionRolledBack)) {
              console.warn("Encountered another error while rolling back a Gadget transaction that errored. The other error:", rollbackError);
            }
          }
          if (isCloseEvent(error2)) {
            throw new GadgetUnexpectedCloseError(error2);
          } else {
            throw error2;
          }
        } finally {
          await (subscriptionClient == null ? void 0 : subscriptionClient.dispose());
          this.currentTransaction = null;
        }
      };
      this.fetch = async (input, init = {}) => {
        input = processMaybeRelativeInput(input, this.options.baseRouteURL ?? this.options.endpoint);
        if (this.isGadgetRequest(input)) {
          const requestHeaders = await this.requestHeaders();
          init.headers = { ...requestHeaders, ...init.headers };
          if (this.authenticationMode == AuthenticationMode.Custom) {
            await this.options.authenticationMode.custom.processFetch(input, init);
          }
        }
        const response = await this._fetchImplementation(input, init);
        if (this.authenticationMode == AuthenticationMode.BrowserSession) {
          const headerValue = response.headers.get("x-set-authorization");
          const sessionToken = (headerValue == null ? void 0 : headerValue.startsWith("Session ")) ? headerValue.replace("Session ", "") : null;
          if (sessionToken) {
            this.sessionTokenStore.setItem(this.sessionStorageKey, sessionToken);
          }
        }
        return response;
      };
      if (!options.endpoint)
        throw new Error("Must provide an `endpoint` option for a GadgetConnection to connect to");
      this.endpoint = options.endpoint;
      if (options.fetchImplementation) {
        this._fetchImplementation = options.fetchImplementation;
      } else if (typeof objectForGlobals != "undefined" && objectForGlobals.fetch) {
        this._fetchImplementation = (...args) => objectForGlobals.fetch(...args);
      } else {
        throw new Error("No fetch implementation found on the global, can't boot GadgetClient");
      }
      this.websocketImplementation = options.websocketImplementation ?? (globalThis == null ? void 0 : globalThis.WebSocket) ?? WebSocket$1;
      this.websocketsEndpoint = options.websocketsEndpoint ?? options.endpoint + "/batch";
      this.websocketsEndpoint = this.websocketsEndpoint.replace(/^http/, "ws");
      this.environment = options.environment ?? "Development";
      this.requestPolicy = options.requestPolicy ?? "cache-and-network";
      this.exchanges = {
        beforeAll: [],
        beforeAsync: [],
        afterAll: [],
        ...options.exchanges
      };
      this.createSubscriptionClient = options.createSubscriptionClient ?? createClient;
      this.setAuthenticationMode(options.authenticationMode);
      this.enqueue = {
        plan: (action, options2) => enqueueActionOperation(action.operationName, action.variables, action.namespace, options2, action.isBulk),
        processOptions: (options2) => graphqlizeBackgroundOptions(options2),
        processResult: (action, result) => {
          let error2 = ErrorWrapper.forMaybeCombinedError(result.error);
          let handle = null;
          let handles = null;
          const isBulk = "isBulk" in action ? action.isBulk : false;
          if (result.data) {
            const dataPath = ["background", ...namespaceDataPath([action.operationName], action.namespace)];
            const mutationData = get(result.data, dataPath);
            if (mutationData) {
              const errors = mutationData["errors"];
              if (errors && errors[0]) {
                error2 = ErrorWrapper.forErrorsResponse(errors, error2 == null ? void 0 : error2.response);
              } else {
                if (isBulk) {
                  handles = mutationData.backgroundActions.map(
                    (result2) => new BackgroundActionHandle(this, action, result2.id)
                  );
                } else {
                  handle = new BackgroundActionHandle(this, action, mutationData.backgroundAction.id);
                }
              }
            }
          }
          if (isBulk) {
            return { handles, error: error2 };
          } else {
            return { handle, error: error2 };
          }
        }
      };
      this.baseClient = this.newBaseClient();
    }
    get sessionStorageKey() {
      return `${sessionStorageKey}-${this.endpoint}`;
    }
    get currentClient() {
      var _a;
      return ((_a = this.currentTransaction) == null ? void 0 : _a.client) || this.baseClient;
    }
    set fetchImplementation(implementation) {
      this._fetchImplementation = implementation;
      this.resetClients();
    }
    /**
     * Change the authentication mode settings for this connection imperatively.
     * @private This function is generally not required for use by external developers, but is useful for those building integrations against the Gadget API to configure passed in `api` objects.
     */
    setAuthenticationMode(options) {
      if (options) {
        if (options.browserSession) {
          this.enableSessionMode(options.browserSession);
        } else if (options.internal) {
          this.authenticationMode = AuthenticationMode.Internal;
        } else if (options.internalAuthToken) {
          this.authenticationMode = AuthenticationMode.InternalAuthToken;
        } else if (options.apiKey) {
          this.authenticationMode = AuthenticationMode.APIKey;
        } else if (options.custom) {
          this.authenticationMode = AuthenticationMode.Custom;
        }
        this.options.authenticationMode = options;
      }
      this.authenticationMode ?? (this.authenticationMode = AuthenticationMode.Anonymous);
    }
    enableSessionMode(options) {
      this.authenticationMode = AuthenticationMode.BrowserSession;
      const desiredMode = !options || typeof options == "boolean" || !("storageType" in options) ? BrowserSessionStorageType.Durable : options.storageType;
      let sessionTokenStore;
      if (desiredMode == BrowserSessionStorageType.Durable && storageAvailable("localStorage")) {
        sessionTokenStore = window.localStorage;
      } else if (desiredMode == BrowserSessionStorageType.Session && storageAvailable("sessionStorage")) {
        sessionTokenStore = window.sessionStorage;
      } else {
        sessionTokenStore = new InMemoryStorage();
      }
      if (options !== null && typeof options === "object" && "initialToken" in options && options.initialToken) {
        sessionTokenStore.setItem(this.sessionStorageKey, options.initialToken);
      }
      this.sessionTokenStore = sessionTokenStore;
      this.resetClients();
    }
    close() {
      if (this.baseSubscriptionClient)
        this.disposeClient(this.baseSubscriptionClient);
      if (this.currentTransaction) {
        this.currentTransaction.close();
      }
    }
    isGadgetRequest(input) {
      let requestUrl;
      if (typeof input === "string") {
        requestUrl = input;
      } else if (typeof input === "object" && "url" in input) {
        requestUrl = input.url;
      } else {
        requestUrl = String(input);
      }
      if (isRelativeUrl(this.options.endpoint)) {
        if (isRelativeUrl(requestUrl)) {
          return true;
        } else {
          return false;
        }
      }
      const host = new URL(this.options.endpoint).host;
      return requestUrl.includes(host);
    }
    resetClients() {
      if (this.currentTransaction) {
        throw new Error("Can't reset clients while a transaction is open");
      }
      if (this.baseSubscriptionClient)
        this.disposeClient(this.baseSubscriptionClient);
      if (this.baseClient)
        this.baseClient = this.newBaseClient();
    }
    newBaseClient() {
      const exchanges = [...this.exchanges.beforeAll, operationNameExchange, urlParamExchange];
      if (typeof window != "undefined") {
        exchanges.push(cacheExchange);
        exchanges.push(liveQueryExchange);
      }
      exchanges.push(
        ...this.exchanges.beforeAsync,
        // standard subscriptions for normal GraphQL subscriptions
        subscriptionExchange({
          forwardSubscription: (request) => {
            return {
              subscribe: (sink) => {
                const input = { ...request, query: request.query || "" };
                const dispose = this.getBaseSubscriptionClient().subscribe(input, sink);
                return {
                  unsubscribe: dispose
                };
              }
            };
          }
        }),
        // another subscription exchange for live queries
        // live queries pass through the same WS client, but use jsondiffs for patching in results
        subscriptionExchange({
          isSubscriptionOperation: (request) => {
            return request.query.definitions.some((definition) => isLiveQueryOperationDefinitionNode(definition));
          },
          forwardSubscription: (request) => {
            return {
              subscribe: (sink) => {
                let unsubscribe = void 0;
                const loadAndSubscribe = Promise.resolve().then(() => index).then(({ applyAsyncIterableIteratorToSink: applyAsyncIterableIteratorToSink2, applyLiveQueryJSONDiffPatch: applyLiveQueryJSONDiffPatch2, makeAsyncIterableIteratorFromSink: makeAsyncIterableIteratorFromSink2 }) => {
                  const input = { ...request, query: request.query || "" };
                  unsubscribe = applyAsyncIterableIteratorToSink2(
                    applyLiveQueryJSONDiffPatch2(
                      makeAsyncIterableIteratorFromSink2(
                        (sink2) => this.getBaseSubscriptionClient().subscribe(input, sink2)
                      )
                    ),
                    sink
                  );
                  return unsubscribe;
                }).catch((error2) => sink.error(error2));
                return {
                  unsubscribe: () => {
                    if (unsubscribe) {
                      unsubscribe();
                    } else {
                      void loadAndSubscribe.then((unsubscribe2) => {
                        if (unsubscribe2) {
                          unsubscribe2();
                        }
                      });
                    }
                  }
                };
              }
            };
          }
        }),
        fetchExchange,
        ...this.exchanges.afterAll
      );
      const client = new C({
        url: this.endpoint,
        fetch: this.fetch,
        exchanges,
        requestPolicy: this.requestPolicy,
        preferGetMethod: false
      });
      client[$gadgetConnection] = this;
      return client;
    }
    newSubscriptionClient(overrides) {
      if (!this.websocketImplementation) {
        throw new Error(
          "Can't use this GadgetClient for this subscription-based operation as there's no global WebSocket implementation available. Please pass one as the `websocketImplementation` option to the GadgetClient constructor."
        );
      }
      let url = this.websocketsEndpoint;
      if (overrides == null ? void 0 : overrides.urlParams) {
        url = addUrlParams(url, overrides.urlParams);
      }
      let activeSocket;
      let timedOut;
      return this.createSubscriptionClient({
        url,
        webSocketImpl: this.websocketImplementation,
        keepAlive: 7e3,
        connectionParams: async () => {
          var _a, _b, _c, _d;
          const connectionParams = { environment: this.environment, auth: { type: this.authenticationMode } };
          if (this.authenticationMode == AuthenticationMode.APIKey) {
            connectionParams.auth.key = this.options.authenticationMode.apiKey;
          } else if (this.authenticationMode == AuthenticationMode.Internal || this.authenticationMode == AuthenticationMode.InternalAuthToken) {
            const authToken = this.authenticationMode == AuthenticationMode.Internal ? this.options.authenticationMode.internal.authToken : this.options.authenticationMode.internalAuthToken;
            connectionParams.auth.token = authToken;
            if (this.authenticationMode == AuthenticationMode.Internal && this.options.authenticationMode.internal.actAsSession) {
              connectionParams.auth.actAsInternalSession = true;
              connectionParams.auth.internalSessionId = await ((_b = (_a = this.options.authenticationMode.internal).getSessionId) == null ? void 0 : _b.call(_a));
            }
          } else if (this.authenticationMode == AuthenticationMode.BrowserSession) {
            connectionParams.auth.sessionToken = this.sessionTokenStore.getItem(this.sessionStorageKey);
          } else if (this.authenticationMode == AuthenticationMode.Custom) {
            await ((_d = (_c = this.options.authenticationMode) == null ? void 0 : _c.custom) == null ? void 0 : _d.processTransactionConnectionParams(connectionParams));
          }
          return connectionParams;
        },
        onNonLazyError: () => {
        },
        on: {
          connected: (socket, payload, wasRetry) => {
            var _a, _b, _c, _d, _e, _f;
            if (this.authenticationMode == AuthenticationMode.BrowserSession && (payload == null ? void 0 : payload.sessionToken)) {
              const browserSession = (_a = this.options.authenticationMode) == null ? void 0 : _a.browserSession;
              const initialToken = browserSession !== null && typeof browserSession === "object" ? browserSession.initialToken : null;
              if (!initialToken) {
                this.sessionTokenStore.setItem(this.sessionStorageKey, payload.sessionToken);
              }
            }
            (_d = (_c = (_b = this.subscriptionClientOptions) == null ? void 0 : _b.on) == null ? void 0 : _c.connected) == null ? void 0 : _d.call(_c, socket, payload, wasRetry);
            (_f = (_e = overrides == null ? void 0 : overrides.on) == null ? void 0 : _e.connected) == null ? void 0 : _f.call(_e, socket, payload, wasRetry);
            activeSocket = socket;
          },
          ping: (received) => {
            if (!received) {
              timedOut = setTimeout(() => {
                if (activeSocket.readyState === WebSocket$1.OPEN) {
                  activeSocket.close(4408, "Request Timeout");
                }
              }, 3e3);
            }
          },
          pong: (received) => {
            if (received)
              clearTimeout(timedOut);
          }
        },
        ...this.subscriptionClientOptions,
        ...overrides
      });
    }
    async requestHeaders() {
      var _a, _b, _c;
      const headers = {};
      if (this.authenticationMode == AuthenticationMode.Internal || this.authenticationMode == AuthenticationMode.InternalAuthToken) {
        const authToken = this.authenticationMode == AuthenticationMode.Internal ? this.options.authenticationMode.internal.authToken : this.options.authenticationMode.internalAuthToken;
        headers.authorization = "Basic " + base64("gadget-internal:" + authToken);
        if (this.authenticationMode == AuthenticationMode.Internal && this.options.authenticationMode.internal.actAsSession) {
          headers["x-gadget-act-as-internal-session"] = "true";
          const sessionId = await ((_b = (_a = this.options.authenticationMode.internal).getSessionId) == null ? void 0 : _b.call(_a));
          if (sessionId) {
            headers["x-gadget-internal-session-id"] = sessionId;
          }
        }
      } else if (this.authenticationMode == AuthenticationMode.APIKey) {
        headers.authorization = `Bearer ${(_c = this.options.authenticationMode) == null ? void 0 : _c.apiKey}`;
      } else if (this.authenticationMode == AuthenticationMode.BrowserSession) {
        const val = this.sessionTokenStore.getItem(this.sessionStorageKey);
        if (val) {
          headers.authorization = `Session ${val}`;
        }
        const browserSessionOptions = this.options.authenticationMode.browserSession;
        const shopId = typeof browserSessionOptions === "boolean" ? void 0 : browserSessionOptions.shopId;
        if (shopId) {
          headers["x-gadget-for-shop-id"] = shopId;
        }
      }
      headers["x-gadget-environment"] = this.environment;
      return headers;
    }
    async waitForOpenedConnection(options) {
      let subscriptionClient = this.newSubscriptionClient(options);
      let unsubscribes = [];
      const totalAttempts = options.connectionAttempts || DEFAULT_CONN_ATTEMPTS;
      let remainingRetries = totalAttempts - 1;
      const globalTimeout = options.connectionGlobalTimeoutMs || DEFAULT_CONN_GLOBAL_TIMEOUT;
      let retryTimeoutId;
      const clearListeners = () => {
        if (retryTimeoutId !== void 0) {
          clearTimeout(retryTimeoutId);
          retryTimeoutId = void 0;
        }
        unsubscribes.forEach((fn) => fn());
        unsubscribes = [];
      };
      return await new Promise((resolve, reject2) => {
        const timeout = setTimeout(() => {
          clearListeners();
          this.disposeClient(subscriptionClient);
          wrappedReject(new GadgetWebsocketConnectionTimeoutError("Timeout opening websocket connection to Gadget API"));
        }, globalTimeout);
        const retryOnClose = (event) => {
          if (isCloseEvent(event)) {
            if (RETRYABLE_CLOSE_CODES.includes(event.code) && remainingRetries > 0) {
              remainingRetries -= 1;
              clearListeners();
              this.disposeClient(subscriptionClient);
              const retryNumber = totalAttempts - 1 - remainingRetries;
              const delay = calculateRetryDelay(retryNumber);
              retryTimeoutId = setTimeout(() => {
                retryTimeoutId = void 0;
                subscriptionClient = this.newSubscriptionClient(options);
                resetListeners();
              }, delay);
              return;
            }
            if (event.code == 4294) {
              clearListeners();
              return wrappedReject(new GadgetTooManyRequestsError(event.reason));
            }
          }
          clearListeners();
          clearTimeout(timeout);
          reject2(new GadgetUnexpectedCloseError(event));
        };
        const wrappedReject = (err) => {
          clearTimeout(timeout);
          reject2(err);
        };
        const wrappedResolve = () => {
          clearTimeout(timeout);
          resolve(subscriptionClient);
        };
        const resetListeners = () => {
          clearListeners();
          unsubscribes.push(subscriptionClient.on("connected", wrappedResolve));
          unsubscribes.push(subscriptionClient.on("closed", retryOnClose));
          unsubscribes.push(subscriptionClient.on("error", wrappedReject));
        };
        resetListeners();
      }).finally(clearListeners);
    }
    disposeClient(client) {
      const maybePromise = client.dispose();
      if (maybePromise) {
        maybePromise.catch((err) => console.error(`Error closing SubscriptionClient: ${err.message}`));
      }
    }
    getBaseSubscriptionClient() {
      if (!this.baseSubscriptionClient) {
        this.baseSubscriptionClient = this.newSubscriptionClient({ lazy: true });
      }
      return this.baseSubscriptionClient;
    }
  }
  GadgetConnection.version = "vendored";
  function processMaybeRelativeInput(input, endpoint) {
    if (typeof input != "string")
      return input;
    if (isRelativeUrl(input)) {
      try {
        return String(new URL(input, endpoint));
      } catch (err) {
        return input;
      }
    }
    return input;
  }
  function isRelativeUrl(url) {
    return url.startsWith("/") && !url.startsWith("//");
  }
  class GadgetRecordList extends Array {
    /** Internal method used to create a list. Should not be used by applications. */
    static boot(modelManager, records2, pagination) {
      const list = new GadgetRecordList();
      list.push(...records2);
      Object.defineProperty(list, "modelManager", { value: modelManager, enumerable: false, writable: true, configurable: true });
      list.pagination = pagination;
      Object.freeze(list);
      return list;
    }
    firstOrThrow() {
      if (!this[0]) {
        throw new GadgetOperationError("No records found.", "GGT_RECORD_NOT_FOUND");
      }
      return this[0];
    }
    toJSON() {
      return this.map((record) => record.toJSON());
    }
    get hasNextPage() {
      return this.pagination.pageInfo.hasNextPage;
    }
    get hasPreviousPage() {
      return this.pagination.pageInfo.hasPreviousPage;
    }
    get startCursor() {
      return this.pagination.pageInfo.startCursor;
    }
    get endCursor() {
      return this.pagination.pageInfo.endCursor;
    }
    async nextPage() {
      if (!this.hasNextPage)
        throw new GadgetClientError("Cannot request next page because there isn't one, should check 'hasNextPage' to see if it exists");
      const { first, last, before: _before, ...options } = this.pagination.options ?? {};
      const nextPage = this.modelManager.findMany({
        ...options,
        after: this.pagination.pageInfo.endCursor,
        first: first || last
      });
      return await nextPage;
    }
    async previousPage() {
      if (!this.hasPreviousPage)
        throw new GadgetClientError(
          "Cannot request previous page because there isn't one, should check 'hasPreviousPage' to see if it exists"
        );
      const { first, last, after: _after, ...options } = this.pagination.options ?? {};
      const prevPage = this.modelManager.findMany({
        ...options,
        before: this.pagination.pageInfo.startCursor,
        last: last || first
      });
      return await prevPage;
    }
  }
  Object.defineProperty(GadgetRecordList, Symbol.species, {
    get() {
      return Array;
    }
  });
  const internalFindOneQuery = (apiIdentifier, id, namespace, select) => {
    const capitalizedApiIdentifier = capitalizeIdentifier(apiIdentifier);
    return compileWithVariableValues({
      type: "query",
      name: `InternalFind${capitalizedApiIdentifier}`,
      fields: {
        internal: namespacify(namespace, {
          [apiIdentifier]: Call({
            id: Var({ value: id, type: "GadgetID!" }),
            select: Var({ value: formatInternalSelectVariable(select), type: `[String!]` })
          })
        }),
        ...hydrationSelection(apiIdentifier, namespace)
      }
    });
  };
  const internalFindListVariables = (apiIdentifier, namespace, options) => {
    return {
      search: (options == null ? void 0 : options.search) ? Var({ value: options == null ? void 0 : options.search, type: "String" }) : void 0,
      sort: (options == null ? void 0 : options.sort) ? Var({ value: options == null ? void 0 : options.sort, type: `[${sortTypeName(apiIdentifier, namespace)}!]` }) : void 0,
      filter: (options == null ? void 0 : options.filter) ? Var({ value: options == null ? void 0 : options.filter, type: `[${filterTypeName(apiIdentifier, namespace)}!]` }) : void 0,
      select: (options == null ? void 0 : options.select) ? Var({ value: formatInternalSelectVariable(options == null ? void 0 : options.select), type: `[String!]` }) : void 0,
      searchFields: (options == null ? void 0 : options.searchFields) ? Var({ value: jsSearchFieldsToGqlSearchFields(options.searchFields), type: `${searchableFieldTypeName(apiIdentifier, namespace)}` }) : void 0
    };
  };
  const internalFindFirstQuery = (apiIdentifier, namespace, options) => {
    const capitalizedApiIdentifier = capitalizeIdentifier(apiIdentifier);
    const defaultVariables = internalFindListVariables(capitalizedApiIdentifier, namespace, options);
    return compileWithVariableValues({
      type: "query",
      name: `InternalFindFirst${capitalizedApiIdentifier}`,
      fields: {
        internal: namespacify(namespace, {
          [`list${capitalizedApiIdentifier}`]: Call(
            {
              ...defaultVariables,
              first: Var({ value: 1, type: "Int" })
            },
            {
              edges: {
                node: true
              }
            }
          )
        }),
        ...hydrationSelection(apiIdentifier, namespace)
      }
    });
  };
  const internalFindManyQuery = (apiIdentifier, namespace, options) => {
    const capitalizedApiIdentifier = capitalizeIdentifier(apiIdentifier);
    const defaultVariables = internalFindListVariables(capitalizedApiIdentifier, namespace, options);
    return compileWithVariableValues({
      type: "query",
      name: `InternalFindMany${capitalizedApiIdentifier}`,
      fields: {
        internal: namespacify(namespace, {
          [`list${capitalizedApiIdentifier}`]: Call(
            {
              ...defaultVariables,
              after: (options == null ? void 0 : options.after) ? Var({ value: options.after, type: "String" }) : void 0,
              before: (options == null ? void 0 : options.before) ? Var({ value: options == null ? void 0 : options.before, type: "String" }) : void 0,
              first: (options == null ? void 0 : options.first) ? Var({ value: options == null ? void 0 : options.first, type: "Int" }) : void 0,
              last: (options == null ? void 0 : options.last) ? Var({ value: options == null ? void 0 : options.last, type: "Int" }) : void 0
            },
            {
              pageInfo: { hasNextPage: true, hasPreviousPage: true, startCursor: true, endCursor: true },
              edges: { cursor: true, node: true }
            }
          )
        }),
        ...hydrationSelection(apiIdentifier, namespace)
      }
    });
  };
  const internalInputTypeName = (apiIdentifier, namespace) => `Internal${namespacedGraphQLTypeName(apiIdentifier, namespace)}Input`;
  const internalCreateMutation = (apiIdentifier, namespace, record) => {
    const capitalizedApiIdentifier = capitalizeIdentifier(apiIdentifier);
    return compileWithVariableValues({
      type: "mutation",
      name: `InternalCreate${capitalizedApiIdentifier}`,
      fields: {
        internal: namespacify(namespace, {
          [`create${capitalizedApiIdentifier}`]: Call(
            {
              [apiIdentifier]: Var({ value: record, type: internalInputTypeName(apiIdentifier, namespace) })
            },
            {
              success: true,
              ...ErrorsSelection,
              [apiIdentifier]: true
            }
          )
        }),
        ...hydrationSelection(apiIdentifier, namespace)
      }
    });
  };
  const internalBulkCreateMutation = (apiIdentifier, pluralApiIdentifier, namespace, records2) => {
    const capitalizedPluralApiIdentifier = capitalizeIdentifier(pluralApiIdentifier);
    return compileWithVariableValues({
      type: "mutation",
      name: `InternalBulkCreate${capitalizedPluralApiIdentifier}`,
      fields: {
        internal: namespacify(namespace, {
          [`bulkCreate${capitalizedPluralApiIdentifier}`]: Call(
            {
              [pluralApiIdentifier]: Var({ value: records2, type: `[${internalInputTypeName(apiIdentifier, namespace)}]!` })
            },
            {
              success: true,
              ...ErrorsSelection,
              [pluralApiIdentifier]: true
            }
          )
        }),
        ...hydrationSelection(apiIdentifier, namespace)
      }
    });
  };
  const internalUpdateMutation = (apiIdentifier, namespace, id, record) => {
    const capitalizedApiIdentifier = capitalizeIdentifier(apiIdentifier);
    return compileWithVariableValues({
      type: "mutation",
      name: `InternalUpdate${capitalizedApiIdentifier}`,
      fields: {
        internal: namespacify(namespace, {
          [`update${capitalizedApiIdentifier}`]: Call(
            {
              id: Var({ value: id, type: "GadgetID!" }),
              [apiIdentifier]: Var({ value: record, type: internalInputTypeName(apiIdentifier, namespace) })
            },
            {
              success: true,
              ...ErrorsSelection,
              [apiIdentifier]: true
            }
          )
        }),
        ...hydrationSelection(apiIdentifier, namespace)
      }
    });
  };
  const internalUpsertMutation = (apiIdentifier, namespace, on, record) => {
    const capitalizedApiIdentifier = capitalizeIdentifier(apiIdentifier);
    return compileWithVariableValues({
      type: "mutation",
      name: `InternalUpsert${capitalizedApiIdentifier}`,
      fields: {
        internal: namespacify(namespace, {
          [`upsert${capitalizedApiIdentifier}`]: Call(
            {
              on: Var({ value: on, type: "[String!]" }),
              [apiIdentifier]: Var({ value: record, type: internalInputTypeName(apiIdentifier, namespace) })
            },
            {
              success: true,
              ...ErrorsSelection,
              [apiIdentifier]: true
            }
          )
        }),
        ...hydrationSelection(apiIdentifier, namespace)
      }
    });
  };
  const internalDeleteMutation = (apiIdentifier, namespace, id) => {
    const capitalizedApiIdentifier = capitalizeIdentifier(apiIdentifier);
    return compileWithVariableValues({
      type: "mutation",
      name: `InternalDelete${capitalizedApiIdentifier}`,
      fields: {
        internal: namespacify(namespace, {
          [`delete${capitalizedApiIdentifier}`]: Call(
            {
              id: Var({ value: id, type: "GadgetID!" })
            },
            {
              success: true,
              ...ErrorsSelection
            }
          )
        })
      }
    });
  };
  const internalDeleteManyMutation = (apiIdentifier, namespace, options) => {
    const capitalizedApiIdentifier = capitalizeIdentifier(apiIdentifier);
    return compileWithVariableValues({
      type: "mutation",
      name: `InternalDeleteMany${capitalizedApiIdentifier}`,
      fields: {
        internal: namespacify(namespace, {
          [`deleteMany${capitalizedApiIdentifier}`]: Call(
            {
              search: (options == null ? void 0 : options.search) ? Var({ value: options == null ? void 0 : options.search, type: "String" }) : void 0,
              filter: (options == null ? void 0 : options.filter) ? Var({ value: options == null ? void 0 : options.filter, type: `[${filterTypeName(apiIdentifier, namespace)}!]` }) : void 0
            },
            {
              success: true,
              ...ErrorsSelection
            }
          )
        })
      }
    });
  };
  class InternalModelManager {
    constructor(apiIdentifier, connection, options) {
      this.apiIdentifier = apiIdentifier;
      this.connection = connection;
      this.options = options;
      this.capitalizedApiIdentifier = camelize(apiIdentifier);
      this.namespace = (options == null ? void 0 : options.namespace) || [];
    }
    validateRecord(record) {
      if (!this.options || !this.options.hasAmbiguousIdentifiers) {
        return true;
      }
      const keys = Object.keys(record);
      return keys.every((key2) => key2 === this.apiIdentifier);
    }
    getRecordFromData(record, functionName) {
      let recordData = record;
      if (!this.validateRecord(record)) {
        throw new GadgetOperationError(
          `Invalid arguments found in variables. Did you mean to use ${functionName}({ ${this.apiIdentifier}: { ... } })?`,
          "GGT_INVALID_RECORD_DATA"
        );
      }
      if (this.apiIdentifier in record) {
        recordData = recordData[this.apiIdentifier];
      }
      return recordData;
    }
    /**
     * Find a single record by ID. Throws an error by default if the record with the given ID is not found.
     *
     * @example
     * // returns post with id 10
     * const post = await api.internal.post.findOne(10);
     *
     * @param id The ID of the record to find
     * @param options Options for the find operation
     * @param throwOnEmptyData Whether or not to throw an error if the record is not found
     * @returns The record, if found
     */
    async findOne(id, options, throwOnEmptyData = true) {
      const plan = internalFindOneQuery(this.apiIdentifier, id, this.namespace, formatInternalSelectVariable(options == null ? void 0 : options.select));
      const response = await this.connection.currentClient.query(plan.query, plan.variables).toPromise();
      const assertSuccess = throwOnEmptyData ? assertOperationSuccess : assertNullableOperationSuccess;
      const result = assertSuccess(response, this.dataPath(this.apiIdentifier));
      return hydrateRecord(response, result);
    }
    /**
     * Find a single record by ID. Returns null if the record doesn't exist.
     *
     * @example
     * // returns post with id 10 if it exists, null otherwise
     * const post = await api.internal.post.maybeFindOne(10);
     *
     * @param id The ID of the record to find
     * @param options Options for the find operation
     * @returns The record, if found, null otherwise
     */
    async maybeFindOne(id, options) {
      const record = await this.findOne(id, options, false);
      return record.isEmpty() ? null : record;
    }
    /**
     * Find a list of records matching the given options
     *
     * @example
     * // returns the first page of published posts
     * const posts = await api.internal.post.findMany({ filter: { published: { equals: true }}});
     *
     * @param options Options for the find operation, like sorts, filters, and pagination
     * @returns The record, if found, null otherwise
     */
    async findMany(options) {
      const plan = internalFindManyQuery(this.apiIdentifier, this.namespace, options);
      const response = await this.connection.currentClient.query(plan.query, plan.variables).toPromise();
      const connection = assertNullableOperationSuccess(response, this.dataPath(`list${this.capitalizedApiIdentifier}`));
      const records2 = hydrateConnection(response, connection);
      return GadgetRecordList.boot(this, records2, { options, pageInfo: connection.pageInfo });
    }
    /**
     * Find the first record matching the given options. Throws an error by default if no records matching the options are found.
     *
     * @example
     * // returns the first published post or throws if none found
     * const post = await api.internal.post.findFirst({ filter: { published: { equals: true }}});
     *
     * @param options Options for the find operation, like sorts, filters, and pagination
     * @returns The first record matching the options
     */
    async findFirst(options, throwOnEmptyData = true) {
      const plan = internalFindFirstQuery(this.apiIdentifier, this.namespace, options);
      const response = await this.connection.currentClient.query(plan.query, plan.variables).toPromise();
      const dataPath = this.dataPath(`list${this.capitalizedApiIdentifier}`);
      let connection;
      if (throwOnEmptyData === false) {
        connection = assertNullableOperationSuccess(response, dataPath);
      } else {
        connection = assertOperationSuccess(response, dataPath, throwOnEmptyData);
      }
      const records2 = hydrateConnection(response, connection);
      const recordList = GadgetRecordList.boot(this, records2, { options, pageInfo: connection.pageInfo });
      return recordList[0];
    }
    /**
     * Find the first record matching the given options. Returns null if no records matching the options are found.
     *
     * @example
     * // returns the first published post or null if none are published
     * const post = await api.internal.post.maybeFindFirst({ filter: { published: { equals: true }}});
     *
     * @param options Options for the find operation, like sorts, filters, and pagination
     * @returns The first record matching the options, null otherwise
     */
    async maybeFindFirst(options) {
      return await this.findFirst(options, false);
    }
    /**
     * Creates a new record in the backend datastore for this model using the Internal API
     *
     * Does *not* run actions -- use the Public API for that.
     *
     * @example
     * // creates a new post record in the database
     * const post = await api.internal.post.create({ title: "A new post" });
     *
     * @param record The data for the record to create
     * @returns The created record
     */
    async create(record) {
      const plan = internalCreateMutation(this.apiIdentifier, this.namespace, this.getRecordFromData(record, "create"));
      const response = await this.connection.currentClient.mutation(plan.query, plan.variables).toPromise();
      const result = assertMutationSuccess(response, this.dataPath(`create${this.capitalizedApiIdentifier}`));
      return hydrateRecord(response, result[this.apiIdentifier]);
    }
    /**
     * Creates a set of new records in the backend datastore for this model using the Internal API. Creates in bulk within the same database transaction for performance.
     *
     * Does *not* run actions -- use the Public API for that.
     *
     * @example
     * // creates 2 new post records in the database
     * const posts = await api.internal.post.bulkCreate([
     *   { title: "A new post" },
     *   { title: "Another new post" }
     * ]);
     *
     * @param record An array of data for the records to create
     * @returns The created records
     */
    async bulkCreate(records2) {
      var _a;
      if (!((_a = this.options) == null ? void 0 : _a.pluralApiIdentifier)) {
        throw new GadgetClientError("Cannot perform bulkCreate without a pluralApiIdentifier");
      }
      const capitalizedPluralApiIdentifier = capitalizeIdentifier(this.options.pluralApiIdentifier);
      const plan = internalBulkCreateMutation(this.apiIdentifier, this.options.pluralApiIdentifier, this.namespace, records2);
      const response = await this.connection.currentClient.mutation(plan.query, plan.variables).toPromise();
      const result = assertMutationSuccess(response, this.dataPath(`bulkCreate${capitalizedPluralApiIdentifier}`));
      return hydrateRecordArray(response, result[this.options.pluralApiIdentifier]);
    }
    /**
     * Updates an existing record in the backend datastore for this model using the Internal API
     *
     * Does *not* run actions -- use the Public API for that.
     *
     * @example
     * // updates post with id 10 in the database
     * const post = await api.internal.post.update(10, { title: "A new post title" });
     *
     * @param record The data for the record to update
     * @returns The updated record
     */
    async update(id, record) {
      assert(id, `Can't update a record without an ID passed`);
      const plan = internalUpdateMutation(this.apiIdentifier, this.namespace, id, this.getRecordFromData(record, "update"));
      const response = await this.connection.currentClient.mutation(plan.query, plan.variables).toPromise();
      const result = assertMutationSuccess(response, this.dataPath(`update${this.capitalizedApiIdentifier}`));
      return hydrateRecord(response, result[this.apiIdentifier]);
    }
    /**
     * Upserts a record in the backend datastore for this model using the Internal API.
     * If a matching record exists, it will be updated. If it doesn't exist, it will be created.
     * By default records will be matched by the `id` field, but you can specify a different field to match on.
     *
     * Does *not* run actions -- use the Public API for that.
     *
     * @example
     * // upserts post with id 10 in the database
     * // if a post with id 10 exists, it will be updated
     * // if a post with id 10 does not exist, it will be created
     * const post = await api.internal.post.upsert({ id: "10", title: "A new post title" });
     *
     * @example
     * // upserts post with slug "new-post" in the database
     * // if a post with slug "new-post" exists, it will be updated
     * // if a post with slug "new-post" does not exist, it will be created
     * const post = await api.internal.post.upsert({ post: {slug: "new-post", title: "A new post title" }, on: ["slug"] });
     *
     * @param record The data for the record to update
     * @returns The upserted record
     */
    async upsert(record) {
      const { on, ...recordData } = record;
      if (on) {
        assert(on.length > 0, `Must specify at least one field to upsert on`);
      }
      const plan = internalUpsertMutation(this.apiIdentifier, this.namespace, on, this.getRecordFromData(recordData, "upsert"));
      const response = await this.connection.currentClient.mutation(plan.query, plan.variables).toPromise();
      const result = assertMutationSuccess(response, this.dataPath(`upsert${this.capitalizedApiIdentifier}`));
      return hydrateRecord(response, result[this.apiIdentifier]);
    }
    /**
     * Deletes an existing record in the backend datastore for this model using the Internal API
     *
     * Does *not* run actions -- use the Public API for that.
     *
     * @example
     * // removes the post with id 10 in the database
     * await api.internal.post.delete(10);
     *
     * @param id The id of the record to delete
     */
    async delete(id) {
      assert(id, `Can't delete a record without an ID`);
      const plan = internalDeleteMutation(this.apiIdentifier, this.namespace, id);
      const response = await this.connection.currentClient.mutation(plan.query, plan.variables).toPromise();
      assertMutationSuccess(response, this.dataPath(`delete${this.capitalizedApiIdentifier}`));
    }
    /**
     * Deletes the records in the backend datastore that match the given filter criteria. Uses the Internal API.
     *
     * Does *not* run actions -- use the Public API for that.
     *
     * @example
     * // removes all unpublished posts from the database
     * await api.internal.post.deleteMany({filter: { published: { equals: false } } });
     *
     * @param options Search and filter options for the records to delete
     */
    async deleteMany(options) {
      const plan = internalDeleteManyMutation(this.apiIdentifier, this.namespace, options);
      const response = await this.connection.currentClient.mutation(plan.query, plan.variables).toPromise();
      assertMutationSuccess(response, this.dataPath(`deleteMany${this.capitalizedApiIdentifier}`));
    }
    dataPath(dataPath) {
      return ["internal", ...namespaceDataPath([dataPath], this.namespace)];
    }
  }
  function formatInternalSelectVariable(select) {
    if (!select)
      return;
    if (Array.isArray(select))
      return select;
    const result = [];
    for (const [key2, value2] of Object.entries(select)) {
      if (value2) {
        result.push(key2);
      }
    }
    return result;
  }
  const mapAsyncIterable = (source, mapper) => {
    return {
      [Symbol.asyncIterator]() {
        const iter = source[Symbol.asyncIterator]();
        return {
          async next() {
            const { done, value: value2 } = await iter.next();
            return {
              done,
              value: typeof value2 != "undefined" ? mapper(value2) : void 0
            };
          },
          async return(value2) {
            var _a;
            return await ((_a = iter.return) == null ? void 0 : _a.call(iter, value2));
          }
        };
      }
    };
  };
  function maybeLiveStream($result, mapper, options) {
    if (options == null ? void 0 : options.live) {
      return mapAsyncIterable(toAsyncIterable($result), mapper);
    } else {
      const promise = pipe(
        $result,
        filter((result) => !result.stale && !result.hasNext),
        take(1),
        toPromise
      );
      return promise.then((value2) => mapper(value2));
    }
  }
  const findOneRunner = (modelManager, operation, id, defaultSelection, modelApiIdentifier2, options, throwOnEmptyData = true, namespace) => {
    const plan = findOneOperation(operation, id, defaultSelection, modelApiIdentifier2, options, namespace);
    const $results = modelManager.connection.currentClient.query(plan.query, plan.variables);
    return maybeLiveStream(
      $results,
      (response) => {
        const assertSuccess = throwOnEmptyData ? assertOperationSuccess : assertNullableOperationSuccess;
        const dataPath = namespaceDataPath([operation], namespace);
        const record = assertSuccess(response, dataPath);
        return hydrateRecord(response, record);
      },
      options
    );
  };
  const findOneByFieldRunner = (modelManager, operation, fieldName, fieldValue, defaultSelection, modelApiIdentifier2, options, throwOnEmptyData = true, namespace) => {
    const plan = findOneByFieldOperation(operation, fieldName, fieldValue, defaultSelection, modelApiIdentifier2, options, namespace);
    const dataPath = namespaceDataPath([operation], namespace);
    const $results = modelManager.connection.currentClient.query(plan.query, plan.variables);
    return maybeLiveStream(
      $results,
      (response) => {
        const connectionObject = assertOperationSuccess(response, dataPath);
        const records2 = hydrateConnection(response, connectionObject);
        if (records2.length > 1) {
          throw getNonUniqueDataError(modelApiIdentifier2, fieldName, fieldValue);
        }
        const result = records2[0];
        if (!result && throwOnEmptyData) {
          throw new GadgetNotFoundError(`${modelApiIdentifier2} record with ${fieldName}=${fieldValue} not found`);
        }
        return result ?? null;
      },
      options
    );
  };
  const findManyRunner = (modelManager, operation, defaultSelection, modelApiIdentifier2, options, throwOnEmptyData, namespace) => {
    const plan = findManyOperation(operation, defaultSelection, modelApiIdentifier2, options, namespace);
    const $results = modelManager.connection.currentClient.query(plan.query, plan.variables);
    const dataPath = namespaceDataPath([operation], namespace);
    return maybeLiveStream(
      $results,
      (response) => {
        let connectionObject;
        if (throwOnEmptyData === false) {
          connectionObject = assertNullableOperationSuccess(response, dataPath);
        } else {
          connectionObject = assertOperationSuccess(response, dataPath, throwOnEmptyData);
        }
        const records2 = hydrateConnection(response, connectionObject);
        return GadgetRecordList.boot(modelManager, records2, { options, pageInfo: connectionObject.pageInfo });
      },
      options
    );
  };
  const findAllRunner = async (modelManager, operation, defaultSelection, modelApiIdentifier2, options, namespace) => {
    const { last: _last, before: _before, live: _live, ...cleanOptions } = options ?? {};
    const pageSize = cleanOptions.first ?? 250;
    const allRecords = [];
    let after = cleanOptions.after;
    while (true) {
      const page = await findManyRunner(
        modelManager,
        operation,
        defaultSelection,
        modelApiIdentifier2,
        { ...cleanOptions, first: pageSize, after },
        void 0,
        namespace
      );
      allRecords.push(...page);
      if (!page.hasNextPage)
        break;
      after = page.endCursor;
    }
    return allRecords;
  };
  const iterateAllRunner = (modelManager, operation, defaultSelection, modelApiIdentifier2, options, namespace) => {
    const { last: _last, before: _before, live: _live, ...cleanOptions } = options ?? {};
    const pageSize = cleanOptions.first ?? 250;
    return {
      [Symbol.asyncIterator]() {
        let currentPage = null;
        let index2 = 0;
        let after = cleanOptions.after;
        let done = false;
        return {
          async next() {
            if (currentPage && index2 < currentPage.length) {
              return { done: false, value: currentPage[index2++] };
            }
            if (currentPage && !currentPage.hasNextPage) {
              done = true;
              return { done: true, value: void 0 };
            }
            if (done) {
              return { done: true, value: void 0 };
            }
            if (currentPage) {
              after = currentPage.endCursor;
            }
            currentPage = await findManyRunner(
              modelManager,
              operation,
              defaultSelection,
              modelApiIdentifier2,
              { ...cleanOptions, first: pageSize, after },
              void 0,
              namespace
            );
            index2 = 0;
            if (currentPage.length === 0) {
              done = true;
              return { done: true, value: void 0 };
            }
            return { done: false, value: currentPage[index2++] };
          }
        };
      }
    };
  };
  const actionRunner = async (modelManager, operation, defaultSelection, modelApiIdentifier2, modelSelectionField, isBulkAction, variables, options, namespace, hasReturnType) => {
    const plan = actionOperation(
      operation,
      defaultSelection,
      modelApiIdentifier2,
      modelSelectionField,
      variables,
      options,
      namespace,
      isBulkAction,
      hasReturnType
    );
    const response = await modelManager.connection.currentClient.mutation(plan.query, plan.variables).toPromise();
    const dataPath = namespaceDataPath([operation], namespace);
    if (!isBulkAction) {
      const mutationTriple = assertMutationSuccess(response, dataPath);
      return processActionResponse(defaultSelection, response, mutationTriple, modelSelectionField, hasReturnType);
    } else {
      const mutationTriple = get(response.data, dataPath);
      const results = processBulkActionResponse(defaultSelection, response, mutationTriple, modelSelectionField, hasReturnType);
      if (mutationTriple.errors) {
        const errors = mutationTriple.errors.map((error2) => gadgetErrorFor(error2));
        throw new GadgetErrorGroup(errors, results);
      }
      return results;
    }
  };
  const globalActionRunner = async (connection, operation, variables, namespace) => {
    const plan = globalActionOperation(operation, variables, namespace);
    const response = await connection.currentClient.mutation(plan.query, plan.variables).toPromise();
    const dataPath = namespaceDataPath([operation], namespace);
    return assertMutationSuccess(response, dataPath).result;
  };
  async function enqueueActionRunner(connection, action, variables, options = {}) {
    const normalizedVariableValues = action.isBulk ? disambiguateBulkActionVariables(action, variables) : disambiguateActionVariables(action, variables);
    const variableOptions = setVariableOptionValues(action.variables, normalizedVariableValues);
    const plan = enqueueActionOperation(action.operationName, variableOptions, action.namespace, options, action.isBulk);
    const response = await connection.currentClient.mutation(plan.query, plan.variables, options).toPromise();
    const dataPath = ["background", ...namespaceDataPath([action.operationName], action.namespace)];
    try {
      const result = assertMutationSuccess(response, dataPath);
      if (action.isBulk) {
        return result.backgroundActions.map((result2) => new BackgroundActionHandle(connection, action, result2.id));
      } else {
        return new BackgroundActionHandle(connection, action, result.backgroundAction.id);
      }
    } catch (error2) {
      if ("code" in error2 && error2.code == "GGT_DUPLICATE_BACKGROUND_ACTION_ID" && (options == null ? void 0 : options.id) && options.onDuplicateID == "ignore") {
        return new BackgroundActionHandle(connection, action, options.id);
      }
      throw error2;
    }
  }
  const inlineComputedViewRunner = async (connection, gqlFieldName, viewQuery, variables, namespace) => {
    const { query, variables: vars } = inlineComputedViewOperation(viewQuery, gqlFieldName, variables, namespace);
    const response = await connection.currentClient.query(query, vars);
    const dataPath = namespaceDataPath([gqlFieldName], namespace);
    return assertOperationSuccess(response, dataPath);
  };
  const computedViewRunner = async (connection, gqlFieldName, variablesOptions, namespace) => {
    const { query, variables } = computedViewOperation(gqlFieldName, variablesOptions, namespace);
    const response = await connection.currentClient.query(query, variables);
    const dataPath = namespaceDataPath([gqlFieldName], namespace);
    return assertOperationSuccess(response, dataPath);
  };
  const buildModelManager = (apiIdentifier, pluralApiIdentifier, defaultSelection, operationGroup) => {
    const modelManagerClass = class {
      constructor(connection) {
        this.connection = connection;
      }
    };
    Object.defineProperty(modelManagerClass, "name", { value: `${apiIdentifier}Manager` });
    for (const operation of operationGroup) {
      switch (operation.type) {
        case "maybeFindOne":
        case "findOne": {
          const allowNull = operation.type.startsWith("maybe");
          if ("functionName" in operation) {
            const processResult = (result, opts) => {
              const value2 = (opts == null ? void 0 : opts.fieldValue) ?? "";
              const dataPath = namespaceDataPath([operation.operationName], operation.namespace);
              let data = result.data;
              let records2 = [];
              if (data) {
                const connection = get(result.data, dataPath);
                if (connection) {
                  records2 = hydrateConnection(result, connection);
                  data = records2[0];
                }
              }
              let error2 = ErrorWrapper.forMaybeCombinedError(result.error);
              if (!error2) {
                if (records2.length > 1) {
                  error2 = ErrorWrapper.forClientSideError(
                    getNonUniqueDataError(operation.modelApiIdentifier, operation.findByVariableName, value2)
                  );
                } else if (result.data && !records2[0]) {
                  error2 = ErrorWrapper.forClientSideError(
                    new GadgetNotFoundError(`${operation.modelApiIdentifier} record with ${operation.findByVariableName}=${value2} not found`)
                  );
                }
              }
              return { data, error: error2 };
            };
            const plan = (fieldValue, options) => {
              return findOneByFieldOperation(
                operation.operationName,
                operation.findByVariableName,
                fieldValue,
                defaultSelection,
                apiIdentifier,
                options,
                operation.namespace
              );
            };
            modelManagerClass.prototype[operation.functionName] = Object.assign(
              function(value2, options) {
                return findOneByFieldRunner(
                  this,
                  operation.operationName,
                  operation.findByField,
                  value2,
                  defaultSelection,
                  apiIdentifier,
                  options,
                  !allowNull,
                  operation.namespace
                );
              },
              operation,
              {
                plan,
                processResult
              }
            );
          } else {
            const processResult = allowNull ? (result) => {
              const dataPath = namespaceDataPath([operation.operationName], operation.namespace);
              let data = result.data ?? null;
              if (data) {
                const value2 = get(data, dataPath);
                data = value2 && "id" in value2 ? hydrateRecord(result, value2) : null;
              }
              const error2 = ErrorWrapper.forMaybeCombinedError(result.error);
              return { data, error: error2 };
            } : (result, opts) => {
              const dataPath = namespaceDataPath([operation.operationName], operation.namespace);
              let data = result.data && get(result.data, dataPath);
              if (data) {
                data = hydrateRecord(result, data);
              }
              const error2 = ErrorWrapper.errorIfDataAbsent({ fetching: false, ...result }, dataPath, opts == null ? void 0 : opts.pause);
              return { data, error: error2 };
            };
            const plan = (value2, options) => {
              return findOneOperation(operation.operationName, value2, defaultSelection, apiIdentifier, options, operation.namespace);
            };
            modelManagerClass.prototype[operation.type] = Object.assign(
              function(id, options) {
                const response = findOneRunner(
                  this,
                  apiIdentifier,
                  id,
                  defaultSelection,
                  apiIdentifier,
                  options,
                  !allowNull,
                  operation.namespace
                );
                return forEachMaybeLiveResponse(response, (record) => record.isEmpty() ? null : record);
              },
              operation,
              {
                plan,
                processResult
              }
            );
          }
          break;
        }
        case "findMany": {
          const processResult = (result, opts) => {
            const dataPath = namespaceDataPath([operation.operationName], operation.namespace);
            let data = result.data;
            if (data) {
              const connection = get(data, dataPath);
              if (connection) {
                const records2 = hydrateConnection(result, connection);
                data = GadgetRecordList.boot(modelManagerClass.prototype, records2, connection);
              }
            }
            const error2 = ErrorWrapper.errorIfDataAbsent({ fetching: false, ...result }, dataPath, opts == null ? void 0 : opts.pause);
            return { data, error: error2 };
          };
          const plan = (options) => {
            return findManyOperation(pluralApiIdentifier, defaultSelection, apiIdentifier, options, operation.namespace);
          };
          modelManagerClass.prototype.findMany = Object.assign(
            function(options) {
              return findManyRunner(this, pluralApiIdentifier, defaultSelection, apiIdentifier, options, void 0, operation.namespace);
            },
            operation,
            {
              plan,
              processResult
            }
          );
          modelManagerClass.prototype.findAll = function(options) {
            return findAllRunner(this, pluralApiIdentifier, defaultSelection, apiIdentifier, options, operation.namespace);
          };
          modelManagerClass.prototype.iterateAll = function(options) {
            return iterateAllRunner(this, pluralApiIdentifier, defaultSelection, apiIdentifier, options, operation.namespace);
          };
          break;
        }
        case "maybeFindFirst":
        case "findFirst": {
          const allowNull = operation.type === "maybeFindFirst";
          const processResult = allowNull ? (result) => {
            const dataPath = namespaceDataPath([operation.operationName], operation.namespace);
            let data = result.data ?? null;
            if (data) {
              const connection = get(data, dataPath);
              if (connection) {
                data = hydrateConnection(result, connection)[0] ?? null;
              } else {
                data = data[0] ?? null;
              }
            }
            return { data, error: ErrorWrapper.forMaybeCombinedError(result.error) };
          } : (result, opts) => {
            const dataPath = namespaceDataPath([operation.operationName], operation.namespace);
            let data = result.data;
            if (data) {
              const connection = get(data, dataPath);
              if (connection) {
                data = hydrateConnection(result, connection)[0];
              } else {
                data = data[0];
              }
            }
            const error2 = ErrorWrapper.errorIfDataAbsent({ fetching: false, ...result }, dataPath, opts == null ? void 0 : opts.pause);
            return { data, error: error2 };
          };
          const plan = (options) => {
            return findManyOperation(
              pluralApiIdentifier,
              defaultSelection,
              apiIdentifier,
              {
                ...options,
                first: 1,
                last: void 0,
                before: void 0,
                after: void 0
              },
              operation.namespace
            );
          };
          modelManagerClass.prototype[operation.type] = Object.assign(
            function(options) {
              const response = findManyRunner(
                this,
                pluralApiIdentifier,
                defaultSelection,
                apiIdentifier,
                {
                  ...options,
                  first: 1,
                  last: void 0,
                  before: void 0,
                  after: void 0
                },
                !allowNull,
                operation.namespace
              );
              return forEachMaybeLiveResponse(response, (list) => (list == null ? void 0 : list[0]) ?? null);
            },
            operation,
            {
              plan,
              processResult
            }
          );
          break;
        }
        case "get": {
          const processResult = (result) => {
            const dataPath = namespaceDataPath([operation.operationName], operation.namespace);
            let data = null;
            const rawRecord = result.data && get(result.data, dataPath);
            if (rawRecord) {
              data = hydrateRecord(result, rawRecord);
            }
            const error2 = ErrorWrapper.forMaybeCombinedError(result.error);
            return { data, error: error2 };
          };
          const plan = (options) => {
            return findOneOperation(operation.operationName, void 0, defaultSelection, apiIdentifier, options, operation.namespace);
          };
          modelManagerClass.prototype.get = Object.assign(
            function(options) {
              return findOneRunner(
                this,
                operation.operationName,
                void 0,
                defaultSelection,
                apiIdentifier,
                options,
                void 0,
                operation.namespace
              );
            },
            operation,
            {
              plan,
              processResult
            }
          );
          break;
        }
        case "action": {
          if (operation.isBulk) {
            const bulkInvokedByIDOnly = !!operation.variables["ids"];
            const processResult = (result) => {
              var _a;
              let error2 = ErrorWrapper.forMaybeCombinedError(result.error);
              let data = void 0;
              if (result.data && !error2) {
                const dataPath = namespaceDataPath([operation.operationName], operation.namespace);
                const mutationData = get(result.data, dataPath);
                if (mutationData) {
                  const isDeleteAction = operation.isDeleter;
                  if (!isDeleteAction) {
                    const errors = mutationData["errors"];
                    if (errors && errors[0]) {
                      error2 = ErrorWrapper.forErrorsResponse(errors, (_a = errors[0]) == null ? void 0 : _a.response);
                    } else {
                      data = operation.hasReturnType ? mutationData.results : hydrateRecordArray(result, mutationData[operation.modelSelectionField]);
                    }
                  } else {
                    data = mutationData;
                  }
                }
              }
              return { data, error: error2 };
            };
            const plan = (options) => {
              return actionOperation(
                operation.operationName,
                operation.isDeleter ? null : operation.defaultSelection,
                apiIdentifier,
                operation.modelSelectionField,
                operation.variables,
                options,
                operation.namespace,
                true,
                operation.hasReturnType
              );
            };
            modelManagerClass.prototype[operation.functionName] = Object.assign(
              async function(inputs, options) {
                let variables;
                if (bulkInvokedByIDOnly) {
                  variables = {
                    ids: {
                      ...operation.variables["ids"],
                      value: inputs
                    }
                  };
                } else {
                  variables = {
                    inputs: {
                      ...operation.variables["inputs"],
                      value: inputs.map(
                        (input) => disambiguateActionParams(this[operation.singleActionFunctionName], void 0, input)
                      )
                    }
                  };
                }
                return await actionRunner(
                  this,
                  operation.operationName,
                  operation.isDeleter ? null : defaultSelection,
                  apiIdentifier,
                  operation.modelSelectionField,
                  true,
                  variables,
                  options,
                  operation.namespace,
                  operation.hasReturnType
                );
              },
              operation,
              {
                plan,
                processResult,
                get singleAction() {
                  return modelManagerClass.prototype[operation.singleActionFunctionName];
                }
              }
            );
          } else {
            const hasId = !!operation.variables["id"];
            const hasOthers = Object.keys(operation.variables).filter((key2) => key2 != "id").length > 0;
            const processResult = (result) => {
              let error2 = ErrorWrapper.forMaybeCombinedError(result.error);
              let data = null;
              if (result.data) {
                const dataPath = namespaceDataPath([operation.operationName], operation.namespace);
                const mutationData = get(result.data, dataPath);
                if (mutationData) {
                  const errors = mutationData["errors"];
                  if (errors && errors[0]) {
                    error2 = ErrorWrapper.forErrorsResponse(errors, error2 == null ? void 0 : error2.response);
                  } else {
                    data = processActionResponse(
                      operation.defaultSelection,
                      result,
                      mutationData,
                      operation.modelSelectionField,
                      operation.hasReturnType
                    );
                  }
                }
              }
              return {
                data,
                error: error2
              };
            };
            const plan = (options) => {
              return actionOperation(
                operation.operationName,
                operation.isDeleter ? null : operation.defaultSelection,
                apiIdentifier,
                operation.modelSelectionField,
                operation.variables,
                options,
                operation.namespace,
                false,
                operation.hasReturnType
              );
            };
            modelManagerClass.prototype[operation.functionName] = Object.assign(
              async function(...args) {
                const [variables, options] = actionArgs(operation, hasId, hasOthers, args);
                return await actionRunner(
                  this,
                  operation.operationName,
                  operation.isDeleter ? null : defaultSelection,
                  apiIdentifier,
                  operation.modelSelectionField,
                  false,
                  variables,
                  options,
                  operation.namespace,
                  operation.hasReturnType
                );
              },
              operation,
              {
                plan,
                processResult
              }
            );
          }
          break;
        }
        case "stubbedAction": {
          modelManagerClass.prototype[operation.functionName] = Object.assign(
            function(..._args) {
              sendDevHarnessStubbedActionEvent(operation);
              throw new Error(operation.errorMessage);
            },
            operation
          );
          break;
        }
        case "computedView": {
          modelManagerClass.prototype[operation.operationName] = isInlineComputedView(operation) ? buildInlineModelComputedView(operation) : buildModelComputedView(operation);
          break;
        }
        case "stubbedComputedView": {
          modelManagerClass.prototype[operation.operationName] = buildStubbedComputedView(operation);
          break;
        }
      }
    }
    return modelManagerClass;
  };
  const buildGlobalAction = (client, operation) => {
    if (operation.type == "stubbedAction") {
      return Object.assign((..._args) => {
        sendDevHarnessStubbedActionEvent(operation);
        throw new Error(operation.errorMessage);
      }, operation);
    } else {
      const processResult = (result) => {
        var _a;
        let error2 = ErrorWrapper.forMaybeCombinedError(result.error);
        let data = void 0;
        if (result.data) {
          const dataPath = namespaceDataPath([operation.operationName], operation.namespace);
          data = get(result.data, dataPath);
          if (data) {
            const errors = data.errors;
            data = data.result;
            if (errors && errors[0]) {
              error2 = ErrorWrapper.forErrorsResponse(errors, (_a = errors[0]) == null ? void 0 : _a.response);
            }
          }
        }
        return {
          data,
          error: error2
        };
      };
      const plan = (variables) => {
        return globalActionOperation(operation.operationName, { ...operation.variables, ...variables }, operation.namespace);
      };
      return Object.assign(
        async (variables = {}) => {
          const resultVariables = {};
          for (const [name2, variable] of Object.entries(operation.variables)) {
            resultVariables[name2] = {
              value: variables[name2],
              ...variable
            };
          }
          return await globalActionRunner(client.connection, operation.operationName, resultVariables, operation.namespace);
        },
        operation,
        {
          plan,
          processResult
        }
      );
    }
  };
  function buildStubbedComputedView(operation) {
    return Object.assign(async () => {
      throw new Error(operation.errorMessage);
    }, operation);
  }
  function buildModelComputedView(operation) {
    const f2 = operation.variables ? async function(variables = {}) {
      let resultVariables;
      if (operation.variables) {
        resultVariables = {};
        for (const [name2, variable] of Object.entries(operation.variables)) {
          resultVariables[name2] = {
            value: variables[name2],
            ...variable
          };
        }
      }
      return await computedViewRunner(this.connection, operation.gqlFieldName, resultVariables, operation.namespace);
    } : async function() {
      return await computedViewRunner(this.connection, operation.gqlFieldName, void 0, operation.namespace);
    };
    const plan = function(variables) {
      return computedViewOperation(operation.gqlFieldName, variables, operation.namespace);
    };
    const processResult = (result, opts) => {
      const dataPath = namespaceDataPath([operation.gqlFieldName], operation.namespace);
      return processViewResult(result, dataPath, opts == null ? void 0 : opts.pause);
    };
    return Object.assign(f2, operation, { plan, processResult });
  }
  const processViewResult = (result, dataPath, paused) => {
    let resultData = void 0;
    if (result.data) {
      resultData = get(result.data, dataPath);
    }
    const resultError = ErrorWrapper.errorIfDataAbsent(
      { data: result.data, error: result.error, fetching: result.fetching ?? false, stale: result.stale ?? false },
      dataPath,
      paused
    );
    return { data: resultData, error: resultError };
  };
  function buildInlineComputedView(client, operation) {
    const f2 = async function(query, variables) {
      return await inlineComputedViewRunner(client.connection, operation.gqlFieldName, query, variables, operation.namespace);
    };
    return Object.assign(f2, operation);
  }
  function buildInlineModelComputedView(operation) {
    const f2 = async function(query, variables) {
      return await inlineComputedViewRunner(this.connection, operation.gqlFieldName, query, variables, operation.namespace);
    };
    return Object.assign(f2, operation);
  }
  function isInlineComputedView(operation) {
    return operation.functionName == "view";
  }
  function disambiguateActionParams(action, idValue, variables = {}) {
    var _a;
    if (action.hasAmbiguousIdentifier) {
      if (Object.keys(variables).some((key2) => {
        var _a2;
        return !((_a2 = action.paramOnlyVariables) == null ? void 0 : _a2.includes(key2)) && key2 !== action.modelApiIdentifier;
      })) {
        throw Error(`Invalid arguments found in variables. Did you mean to use ({ ${action.modelApiIdentifier}: { ... } })?`);
      }
    }
    let newVariables;
    const idVariable = Object.entries(action.variables).find(([key2, value2]) => key2 === "id" && value2.type === "GadgetID");
    if (action.acceptsModelInput || action.hasCreateOrUpdateEffect) {
      if (action.modelApiIdentifier in variables && typeof variables[action.modelApiIdentifier] === "object" && variables[action.modelApiIdentifier] !== null || !action.variables[action.modelApiIdentifier]) {
        newVariables = variables;
      } else {
        newVariables = {
          [action.modelApiIdentifier]: {}
        };
        for (const [key2, value2] of Object.entries(variables)) {
          if ((_a = action.paramOnlyVariables) == null ? void 0 : _a.includes(key2)) {
            newVariables[key2] = value2;
          } else {
            if (idVariable && key2 === idVariable[0]) {
              newVariables["id"] = value2;
            } else {
              newVariables[action.modelApiIdentifier][key2] = value2;
            }
          }
        }
      }
    } else {
      newVariables = variables;
    }
    newVariables["id"] ?? (newVariables["id"] = idValue);
    return newVariables;
  }
  function actionArgs(operation, hasId, hasOthers, args) {
    let id = void 0;
    let params2 = void 0;
    if (hasId) {
      id = args.shift();
    }
    if (hasOthers) {
      params2 = args.shift();
    }
    const options = args.shift();
    let unambiguousParams = params2;
    if (id || params2) {
      unambiguousParams = disambiguateActionParams(operation, id, params2);
    }
    const resultVariables = {};
    for (const [name2, variable] of Object.entries(operation.variables)) {
      resultVariables[name2] = {
        value: name2 == "id" ? id : unambiguousParams == null ? void 0 : unambiguousParams[name2],
        ...variable
      };
    }
    return [resultVariables, options];
  }
  function forEachMaybeLiveResponse(response, transform) {
    if (Symbol.asyncIterator in response) {
      return {
        [Symbol.asyncIterator]: async function* () {
          for await (const item of response) {
            yield transform(item);
          }
        }
      };
    } else {
      return response.then(transform);
    }
  }
  const sendDevHarnessStubbedActionEvent = (operation) => {
    try {
      if (typeof window !== "undefined" && typeof CustomEvent === "function") {
        const event = new CustomEvent("gadget:devharness:stubbedActionError", {
          detail: {
            reason: operation.reason,
            action: {
              functionName: operation.functionName,
              actionApiIdentifier: operation.actionApiIdentifier,
              modelApiIdentifier: operation.modelApiIdentifier,
              dataPath: operation.dataPath
            }
          }
        });
        window.dispatchEvent(event);
      }
    } catch (error2) {
      console.warn("[gadget] error dispatching gadget dev harness event", error2);
    }
  };
  const DefaultSessionSelection$1 = {
    __typename: true,
    id: true,
    createdAt: true,
    updatedAt: true,
    userId: true
  };
  const modelApiIdentifier$9 = "session";
  const pluralModelApiIdentifier$9 = "sessions";
  const operations$9 = [
    {
      type: "findOne",
      operationName: modelApiIdentifier$9,
      modelApiIdentifier: modelApiIdentifier$9,
      findByVariableName: "id",
      defaultSelection: DefaultSessionSelection$1,
      namespace: null
    },
    {
      type: "maybeFindOne",
      operationName: modelApiIdentifier$9,
      modelApiIdentifier: modelApiIdentifier$9,
      findByVariableName: "id",
      defaultSelection: DefaultSessionSelection$1,
      namespace: null
    },
    {
      type: "findMany",
      operationName: pluralModelApiIdentifier$9,
      modelApiIdentifier: modelApiIdentifier$9,
      defaultSelection: DefaultSessionSelection$1,
      namespace: null
    },
    {
      type: "findFirst",
      operationName: pluralModelApiIdentifier$9,
      modelApiIdentifier: modelApiIdentifier$9,
      defaultSelection: DefaultSessionSelection$1,
      namespace: null
    },
    {
      type: "maybeFindFirst",
      operationName: pluralModelApiIdentifier$9,
      modelApiIdentifier: modelApiIdentifier$9,
      defaultSelection: DefaultSessionSelection$1,
      namespace: null
    },
    {
      type: "findOne",
      operationName: pluralModelApiIdentifier$9,
      functionName: "findById",
      findByField: "id",
      findByVariableName: "id",
      modelApiIdentifier: modelApiIdentifier$9,
      defaultSelection: DefaultSessionSelection$1,
      namespace: null
    },
    {
      type: "maybeFindOne",
      operationName: pluralModelApiIdentifier$9,
      functionName: "maybeFindById",
      findByField: "id",
      findByVariableName: "id",
      modelApiIdentifier: modelApiIdentifier$9,
      defaultSelection: DefaultSessionSelection$1,
      namespace: null
    },
    {
      type: "computedView",
      operationName: "view",
      functionName: "view",
      gqlFieldName: "sessionGellyView",
      namespace: null,
      variables: {
        query: { type: "String", required: true },
        args: { type: "JSONObject" }
      }
    }
  ];
  const SessionManager = buildModelManager(
    modelApiIdentifier$9,
    pluralModelApiIdentifier$9,
    DefaultSessionSelection$1,
    operations$9
  );
  const DefaultSessionSelection = {
    __typename: true,
    id: true,
    createdAt: true,
    updatedAt: true,
    userId: true
  };
  const modelApiIdentifier$8 = "session";
  const pluralModelApiIdentifier$8 = "sessions";
  const operations$8 = [
    {
      type: "get",
      operationName: "currentSession",
      defaultSelection: DefaultSessionSelection,
      modelApiIdentifier: modelApiIdentifier$8,
      namespace: null
    }
  ];
  const CurrentSessionManager = buildModelManager(
    modelApiIdentifier$8,
    pluralModelApiIdentifier$8,
    DefaultSessionSelection,
    operations$8
  );
  const DefaultUserSelection = {
    __typename: true,
    id: true,
    createdAt: true,
    email: true,
    emailVerificationToken: true,
    emailVerificationTokenExpiration: true,
    emailVerified: true,
    firstName: true,
    googleImageUrl: true,
    googleProfileId: true,
    lastName: true,
    lastSignedIn: true,
    organizationId: true,
    profilePicture: { url: true, mimeType: true, fileName: true },
    resetPasswordToken: true,
    resetPasswordTokenExpiration: true,
    roles: { key: true, name: true },
    updatedAt: true
  };
  const modelApiIdentifier$7 = "user";
  const pluralModelApiIdentifier$7 = "users";
  const operations$7 = [
    {
      type: "findOne",
      operationName: modelApiIdentifier$7,
      modelApiIdentifier: modelApiIdentifier$7,
      findByVariableName: "id",
      defaultSelection: DefaultUserSelection,
      namespace: null
    },
    {
      type: "maybeFindOne",
      operationName: modelApiIdentifier$7,
      modelApiIdentifier: modelApiIdentifier$7,
      findByVariableName: "id",
      defaultSelection: DefaultUserSelection,
      namespace: null
    },
    {
      type: "findMany",
      operationName: pluralModelApiIdentifier$7,
      modelApiIdentifier: modelApiIdentifier$7,
      defaultSelection: DefaultUserSelection,
      namespace: null
    },
    {
      type: "findFirst",
      operationName: pluralModelApiIdentifier$7,
      modelApiIdentifier: modelApiIdentifier$7,
      defaultSelection: DefaultUserSelection,
      namespace: null
    },
    {
      type: "maybeFindFirst",
      operationName: pluralModelApiIdentifier$7,
      modelApiIdentifier: modelApiIdentifier$7,
      defaultSelection: DefaultUserSelection,
      namespace: null
    },
    {
      type: "findOne",
      operationName: pluralModelApiIdentifier$7,
      functionName: "findById",
      findByField: "id",
      findByVariableName: "id",
      modelApiIdentifier: modelApiIdentifier$7,
      defaultSelection: DefaultUserSelection,
      namespace: null
    },
    {
      type: "maybeFindOne",
      operationName: pluralModelApiIdentifier$7,
      functionName: "maybeFindById",
      findByField: "id",
      findByVariableName: "id",
      modelApiIdentifier: modelApiIdentifier$7,
      defaultSelection: DefaultUserSelection,
      namespace: null
    },
    {
      type: "findOne",
      operationName: pluralModelApiIdentifier$7,
      functionName: "findByEmail",
      findByField: "email",
      findByVariableName: "email",
      modelApiIdentifier: modelApiIdentifier$7,
      defaultSelection: DefaultUserSelection,
      namespace: null
    },
    {
      type: "maybeFindOne",
      operationName: pluralModelApiIdentifier$7,
      functionName: "maybeFindByEmail",
      findByField: "email",
      findByVariableName: "email",
      modelApiIdentifier: modelApiIdentifier$7,
      defaultSelection: DefaultUserSelection,
      namespace: null
    },
    {
      type: "action",
      operationName: "signUpUser",
      operationReturnType: "SignUpUser",
      functionName: "signUp",
      namespace: null,
      modelApiIdentifier: modelApiIdentifier$7,
      operatesWithRecordIdentity: false,
      modelSelectionField: modelApiIdentifier$7,
      isBulk: false,
      isDeleter: false,
      variables: {
        email: { required: true, type: "String" },
        password: { required: true, type: "String" }
      },
      hasAmbiguousIdentifier: false,
      paramOnlyVariables: [],
      hasReturnType: true,
      acceptsModelInput: false,
      hasCreateOrUpdateEffect: false,
      defaultSelection: DefaultUserSelection
    },
    {
      type: "action",
      operationName: "bulkSignUpUsers",
      functionName: "bulkSignUp",
      isBulk: true,
      isDeleter: false,
      hasReturnType: true,
      acceptsModelInput: false,
      operatesWithRecordIdentity: false,
      singleActionFunctionName: "signUp",
      modelApiIdentifier: modelApiIdentifier$7,
      modelSelectionField: pluralModelApiIdentifier$7,
      namespace: null,
      variables: { inputs: { required: true, type: "[BulkSignUpUsersInput!]" } },
      paramOnlyVariables: [],
      defaultSelection: DefaultUserSelection
    },
    {
      type: "action",
      operationName: "signInUser",
      operationReturnType: "SignInUser",
      functionName: "signIn",
      namespace: null,
      modelApiIdentifier: modelApiIdentifier$7,
      operatesWithRecordIdentity: true,
      modelSelectionField: modelApiIdentifier$7,
      isBulk: false,
      isDeleter: false,
      variables: {
        email: { required: true, type: "String" },
        password: { required: true, type: "String" }
      },
      hasAmbiguousIdentifier: false,
      paramOnlyVariables: [],
      hasReturnType: false,
      acceptsModelInput: false,
      hasCreateOrUpdateEffect: false,
      defaultSelection: DefaultUserSelection
    },
    {
      type: "action",
      operationName: "bulkSignInUsers",
      functionName: "bulkSignIn",
      isBulk: true,
      isDeleter: false,
      hasReturnType: false,
      acceptsModelInput: false,
      operatesWithRecordIdentity: true,
      singleActionFunctionName: "signIn",
      modelApiIdentifier: modelApiIdentifier$7,
      modelSelectionField: pluralModelApiIdentifier$7,
      namespace: null,
      variables: { inputs: { required: true, type: "[BulkSignInUsersInput!]" } },
      paramOnlyVariables: [],
      defaultSelection: DefaultUserSelection
    },
    {
      type: "action",
      operationName: "signOutUser",
      operationReturnType: "SignOutUser",
      functionName: "signOut",
      namespace: null,
      modelApiIdentifier: modelApiIdentifier$7,
      operatesWithRecordIdentity: true,
      modelSelectionField: modelApiIdentifier$7,
      isBulk: false,
      isDeleter: false,
      variables: { id: { required: true, type: "GadgetID" } },
      hasAmbiguousIdentifier: false,
      paramOnlyVariables: [],
      hasReturnType: false,
      acceptsModelInput: false,
      hasCreateOrUpdateEffect: false,
      defaultSelection: DefaultUserSelection
    },
    {
      type: "action",
      operationName: "bulkSignOutUsers",
      functionName: "bulkSignOut",
      isBulk: true,
      isDeleter: false,
      hasReturnType: false,
      acceptsModelInput: false,
      operatesWithRecordIdentity: true,
      singleActionFunctionName: "signOut",
      modelApiIdentifier: modelApiIdentifier$7,
      modelSelectionField: pluralModelApiIdentifier$7,
      namespace: null,
      variables: { ids: { required: true, type: "[GadgetID!]" } },
      paramOnlyVariables: [],
      defaultSelection: DefaultUserSelection
    },
    {
      type: "action",
      operationName: "updateUser",
      operationReturnType: "UpdateUser",
      functionName: "update",
      namespace: null,
      modelApiIdentifier: modelApiIdentifier$7,
      operatesWithRecordIdentity: true,
      modelSelectionField: modelApiIdentifier$7,
      isBulk: false,
      isDeleter: false,
      variables: {
        id: { required: true, type: "GadgetID" },
        user: { required: false, type: "UpdateUserInput" }
      },
      hasAmbiguousIdentifier: false,
      paramOnlyVariables: [],
      hasReturnType: false,
      acceptsModelInput: true,
      hasCreateOrUpdateEffect: true,
      defaultSelection: DefaultUserSelection
    },
    {
      type: "action",
      operationName: "bulkUpdateUsers",
      functionName: "bulkUpdate",
      isBulk: true,
      isDeleter: false,
      hasReturnType: false,
      acceptsModelInput: true,
      operatesWithRecordIdentity: true,
      singleActionFunctionName: "update",
      modelApiIdentifier: modelApiIdentifier$7,
      modelSelectionField: pluralModelApiIdentifier$7,
      namespace: null,
      variables: { inputs: { required: true, type: "[BulkUpdateUsersInput!]" } },
      paramOnlyVariables: [],
      defaultSelection: DefaultUserSelection
    },
    {
      type: "action",
      operationName: "deleteUser",
      operationReturnType: "DeleteUser",
      functionName: "delete",
      namespace: null,
      modelApiIdentifier: modelApiIdentifier$7,
      operatesWithRecordIdentity: true,
      modelSelectionField: modelApiIdentifier$7,
      isBulk: false,
      isDeleter: true,
      variables: { id: { required: true, type: "GadgetID" } },
      hasAmbiguousIdentifier: false,
      paramOnlyVariables: [],
      hasReturnType: false,
      acceptsModelInput: false,
      hasCreateOrUpdateEffect: false,
      defaultSelection: null
    },
    {
      type: "action",
      operationName: "bulkDeleteUsers",
      functionName: "bulkDelete",
      isBulk: true,
      isDeleter: true,
      hasReturnType: false,
      acceptsModelInput: false,
      operatesWithRecordIdentity: true,
      singleActionFunctionName: "delete",
      modelApiIdentifier: modelApiIdentifier$7,
      modelSelectionField: pluralModelApiIdentifier$7,
      namespace: null,
      variables: { ids: { required: true, type: "[GadgetID!]" } },
      paramOnlyVariables: [],
      defaultSelection: null
    },
    {
      type: "action",
      operationName: "sendVerifyEmailUser",
      operationReturnType: "SendVerifyEmailUser",
      functionName: "sendVerifyEmail",
      namespace: null,
      modelApiIdentifier: modelApiIdentifier$7,
      operatesWithRecordIdentity: true,
      modelSelectionField: modelApiIdentifier$7,
      isBulk: false,
      isDeleter: false,
      variables: { email: { required: true, type: "String" } },
      hasAmbiguousIdentifier: false,
      paramOnlyVariables: [],
      hasReturnType: true,
      acceptsModelInput: false,
      hasCreateOrUpdateEffect: false,
      defaultSelection: DefaultUserSelection
    },
    {
      type: "action",
      operationName: "bulkSendVerifyEmailUsers",
      functionName: "bulkSendVerifyEmail",
      isBulk: true,
      isDeleter: false,
      hasReturnType: true,
      acceptsModelInput: false,
      operatesWithRecordIdentity: true,
      singleActionFunctionName: "sendVerifyEmail",
      modelApiIdentifier: modelApiIdentifier$7,
      modelSelectionField: pluralModelApiIdentifier$7,
      namespace: null,
      variables: {
        inputs: { required: true, type: "[BulkSendVerifyEmailUsersInput!]" }
      },
      paramOnlyVariables: [],
      defaultSelection: DefaultUserSelection
    },
    {
      type: "action",
      operationName: "verifyEmailUser",
      operationReturnType: "VerifyEmailUser",
      functionName: "verifyEmail",
      namespace: null,
      modelApiIdentifier: modelApiIdentifier$7,
      operatesWithRecordIdentity: true,
      modelSelectionField: modelApiIdentifier$7,
      isBulk: false,
      isDeleter: false,
      variables: { code: { required: true, type: "String" } },
      hasAmbiguousIdentifier: false,
      paramOnlyVariables: [],
      hasReturnType: true,
      acceptsModelInput: false,
      hasCreateOrUpdateEffect: false,
      defaultSelection: DefaultUserSelection
    },
    {
      type: "action",
      operationName: "bulkVerifyEmailUsers",
      functionName: "bulkVerifyEmail",
      isBulk: true,
      isDeleter: false,
      hasReturnType: true,
      acceptsModelInput: false,
      operatesWithRecordIdentity: true,
      singleActionFunctionName: "verifyEmail",
      modelApiIdentifier: modelApiIdentifier$7,
      modelSelectionField: pluralModelApiIdentifier$7,
      namespace: null,
      variables: {
        inputs: { required: true, type: "[BulkVerifyEmailUsersInput!]" }
      },
      paramOnlyVariables: [],
      defaultSelection: DefaultUserSelection
    },
    {
      type: "action",
      operationName: "sendResetPasswordUser",
      operationReturnType: "SendResetPasswordUser",
      functionName: "sendResetPassword",
      namespace: null,
      modelApiIdentifier: modelApiIdentifier$7,
      operatesWithRecordIdentity: true,
      modelSelectionField: modelApiIdentifier$7,
      isBulk: false,
      isDeleter: false,
      variables: { email: { required: true, type: "String" } },
      hasAmbiguousIdentifier: false,
      paramOnlyVariables: [],
      hasReturnType: true,
      acceptsModelInput: false,
      hasCreateOrUpdateEffect: false,
      defaultSelection: DefaultUserSelection
    },
    {
      type: "action",
      operationName: "bulkSendResetPasswordUsers",
      functionName: "bulkSendResetPassword",
      isBulk: true,
      isDeleter: false,
      hasReturnType: true,
      acceptsModelInput: false,
      operatesWithRecordIdentity: true,
      singleActionFunctionName: "sendResetPassword",
      modelApiIdentifier: modelApiIdentifier$7,
      modelSelectionField: pluralModelApiIdentifier$7,
      namespace: null,
      variables: {
        inputs: { required: true, type: "[BulkSendResetPasswordUsersInput!]" }
      },
      paramOnlyVariables: [],
      defaultSelection: DefaultUserSelection
    },
    {
      type: "action",
      operationName: "resetPasswordUser",
      operationReturnType: "ResetPasswordUser",
      functionName: "resetPassword",
      namespace: null,
      modelApiIdentifier: modelApiIdentifier$7,
      operatesWithRecordIdentity: true,
      modelSelectionField: modelApiIdentifier$7,
      isBulk: false,
      isDeleter: false,
      variables: {
        password: { required: true, type: "String" },
        code: { required: true, type: "String" }
      },
      hasAmbiguousIdentifier: false,
      paramOnlyVariables: [],
      hasReturnType: true,
      acceptsModelInput: false,
      hasCreateOrUpdateEffect: false,
      defaultSelection: DefaultUserSelection
    },
    {
      type: "action",
      operationName: "bulkResetPasswordUsers",
      functionName: "bulkResetPassword",
      isBulk: true,
      isDeleter: false,
      hasReturnType: true,
      acceptsModelInput: false,
      operatesWithRecordIdentity: true,
      singleActionFunctionName: "resetPassword",
      modelApiIdentifier: modelApiIdentifier$7,
      modelSelectionField: pluralModelApiIdentifier$7,
      namespace: null,
      variables: {
        inputs: { required: true, type: "[BulkResetPasswordUsersInput!]" }
      },
      paramOnlyVariables: [],
      defaultSelection: DefaultUserSelection
    },
    {
      type: "action",
      operationName: "changePasswordUser",
      operationReturnType: "ChangePasswordUser",
      functionName: "changePassword",
      namespace: null,
      modelApiIdentifier: modelApiIdentifier$7,
      operatesWithRecordIdentity: true,
      modelSelectionField: modelApiIdentifier$7,
      isBulk: false,
      isDeleter: false,
      variables: {
        id: { required: true, type: "GadgetID" },
        currentPassword: { required: true, type: "String" },
        newPassword: { required: true, type: "String" }
      },
      hasAmbiguousIdentifier: false,
      paramOnlyVariables: [],
      hasReturnType: false,
      acceptsModelInput: false,
      hasCreateOrUpdateEffect: false,
      defaultSelection: DefaultUserSelection
    },
    {
      type: "action",
      operationName: "bulkChangePasswordUsers",
      functionName: "bulkChangePassword",
      isBulk: true,
      isDeleter: false,
      hasReturnType: false,
      acceptsModelInput: false,
      operatesWithRecordIdentity: true,
      singleActionFunctionName: "changePassword",
      modelApiIdentifier: modelApiIdentifier$7,
      modelSelectionField: pluralModelApiIdentifier$7,
      namespace: null,
      variables: {
        inputs: { required: true, type: "[BulkChangePasswordUsersInput!]" }
      },
      paramOnlyVariables: [],
      defaultSelection: DefaultUserSelection
    },
    {
      type: "action",
      operationName: "upsertUser",
      operationReturnType: "UpsertUser",
      functionName: "upsert",
      namespace: null,
      modelApiIdentifier: modelApiIdentifier$7,
      operatesWithRecordIdentity: false,
      modelSelectionField: modelApiIdentifier$7,
      isBulk: false,
      isDeleter: false,
      variables: {
        on: { required: false, type: "[String!]" },
        user: { required: false, type: "UpsertUserInput" },
        email: { required: true, type: "String" },
        password: { required: true, type: "String" }
      },
      hasAmbiguousIdentifier: false,
      paramOnlyVariables: ["on"],
      hasReturnType: {
        "... on SignUpUserResult": { hasReturnType: true },
        "... on UpdateUserResult": { hasReturnType: false }
      },
      acceptsModelInput: true,
      hasCreateOrUpdateEffect: true,
      defaultSelection: DefaultUserSelection
    },
    {
      type: "action",
      operationName: "bulkUpsertUsers",
      functionName: "bulkUpsert",
      isBulk: true,
      isDeleter: false,
      hasReturnType: {
        users: {
          hasReturnType: {
            "... on User": { select: true },
            "... on UpsertUserReturnType": { hasReturnType: true }
          }
        }
      },
      acceptsModelInput: true,
      operatesWithRecordIdentity: false,
      singleActionFunctionName: "upsert",
      modelApiIdentifier: modelApiIdentifier$7,
      modelSelectionField: pluralModelApiIdentifier$7,
      namespace: null,
      variables: { inputs: { required: true, type: "[BulkUpsertUsersInput!]" } },
      paramOnlyVariables: ["on"],
      defaultSelection: DefaultUserSelection
    },
    {
      type: "computedView",
      operationName: "view",
      functionName: "view",
      gqlFieldName: "userGellyView",
      namespace: null,
      variables: {
        query: { type: "String", required: true },
        args: { type: "JSONObject" }
      }
    }
  ];
  const UserManager = buildModelManager(
    modelApiIdentifier$7,
    pluralModelApiIdentifier$7,
    DefaultUserSelection,
    operations$7
  );
  const DefaultConversationSelection = {
    __typename: true,
    id: true,
    country: true,
    createdAt: true,
    customerId: true,
    email: true,
    externalShopId: true,
    lastReadAt: true,
    operatorLastReadAt: true,
    organizationId: true,
    shopName: true,
    status: true,
    subject: true,
    updatedAt: true
  };
  const modelApiIdentifier$6 = "conversation";
  const pluralModelApiIdentifier$6 = "conversations";
  const operations$6 = [
    {
      type: "findOne",
      operationName: modelApiIdentifier$6,
      modelApiIdentifier: modelApiIdentifier$6,
      findByVariableName: "id",
      defaultSelection: DefaultConversationSelection,
      namespace: null
    },
    {
      type: "maybeFindOne",
      operationName: modelApiIdentifier$6,
      modelApiIdentifier: modelApiIdentifier$6,
      findByVariableName: "id",
      defaultSelection: DefaultConversationSelection,
      namespace: null
    },
    {
      type: "findMany",
      operationName: pluralModelApiIdentifier$6,
      modelApiIdentifier: modelApiIdentifier$6,
      defaultSelection: DefaultConversationSelection,
      namespace: null
    },
    {
      type: "findFirst",
      operationName: pluralModelApiIdentifier$6,
      modelApiIdentifier: modelApiIdentifier$6,
      defaultSelection: DefaultConversationSelection,
      namespace: null
    },
    {
      type: "maybeFindFirst",
      operationName: pluralModelApiIdentifier$6,
      modelApiIdentifier: modelApiIdentifier$6,
      defaultSelection: DefaultConversationSelection,
      namespace: null
    },
    {
      type: "findOne",
      operationName: pluralModelApiIdentifier$6,
      functionName: "findById",
      findByField: "id",
      findByVariableName: "id",
      modelApiIdentifier: modelApiIdentifier$6,
      defaultSelection: DefaultConversationSelection,
      namespace: null
    },
    {
      type: "maybeFindOne",
      operationName: pluralModelApiIdentifier$6,
      functionName: "maybeFindById",
      findByField: "id",
      findByVariableName: "id",
      modelApiIdentifier: modelApiIdentifier$6,
      defaultSelection: DefaultConversationSelection,
      namespace: null
    },
    {
      type: "action",
      operationName: "createConversation",
      operationReturnType: "CreateConversation",
      functionName: "create",
      namespace: null,
      modelApiIdentifier: modelApiIdentifier$6,
      operatesWithRecordIdentity: false,
      modelSelectionField: modelApiIdentifier$6,
      isBulk: false,
      isDeleter: false,
      variables: {
        conversation: { required: false, type: "CreateConversationInput" }
      },
      hasAmbiguousIdentifier: false,
      paramOnlyVariables: [],
      hasReturnType: false,
      acceptsModelInput: true,
      hasCreateOrUpdateEffect: true,
      defaultSelection: DefaultConversationSelection
    },
    {
      type: "action",
      operationName: "bulkCreateConversations",
      functionName: "bulkCreate",
      isBulk: true,
      isDeleter: false,
      hasReturnType: false,
      acceptsModelInput: true,
      operatesWithRecordIdentity: false,
      singleActionFunctionName: "create",
      modelApiIdentifier: modelApiIdentifier$6,
      modelSelectionField: pluralModelApiIdentifier$6,
      namespace: null,
      variables: {
        inputs: { required: true, type: "[BulkCreateConversationsInput!]" }
      },
      paramOnlyVariables: [],
      defaultSelection: DefaultConversationSelection
    },
    {
      type: "action",
      operationName: "updateConversation",
      operationReturnType: "UpdateConversation",
      functionName: "update",
      namespace: null,
      modelApiIdentifier: modelApiIdentifier$6,
      operatesWithRecordIdentity: true,
      modelSelectionField: modelApiIdentifier$6,
      isBulk: false,
      isDeleter: false,
      variables: {
        id: { required: true, type: "GadgetID" },
        conversation: { required: false, type: "UpdateConversationInput" }
      },
      hasAmbiguousIdentifier: false,
      paramOnlyVariables: [],
      hasReturnType: false,
      acceptsModelInput: true,
      hasCreateOrUpdateEffect: true,
      defaultSelection: DefaultConversationSelection
    },
    {
      type: "action",
      operationName: "bulkUpdateConversations",
      functionName: "bulkUpdate",
      isBulk: true,
      isDeleter: false,
      hasReturnType: false,
      acceptsModelInput: true,
      operatesWithRecordIdentity: true,
      singleActionFunctionName: "update",
      modelApiIdentifier: modelApiIdentifier$6,
      modelSelectionField: pluralModelApiIdentifier$6,
      namespace: null,
      variables: {
        inputs: { required: true, type: "[BulkUpdateConversationsInput!]" }
      },
      paramOnlyVariables: [],
      defaultSelection: DefaultConversationSelection
    },
    {
      type: "action",
      operationName: "deleteConversation",
      operationReturnType: "DeleteConversation",
      functionName: "delete",
      namespace: null,
      modelApiIdentifier: modelApiIdentifier$6,
      operatesWithRecordIdentity: true,
      modelSelectionField: modelApiIdentifier$6,
      isBulk: false,
      isDeleter: true,
      variables: { id: { required: true, type: "GadgetID" } },
      hasAmbiguousIdentifier: false,
      paramOnlyVariables: [],
      hasReturnType: false,
      acceptsModelInput: false,
      hasCreateOrUpdateEffect: false,
      defaultSelection: null
    },
    {
      type: "action",
      operationName: "bulkDeleteConversations",
      functionName: "bulkDelete",
      isBulk: true,
      isDeleter: true,
      hasReturnType: false,
      acceptsModelInput: false,
      operatesWithRecordIdentity: true,
      singleActionFunctionName: "delete",
      modelApiIdentifier: modelApiIdentifier$6,
      modelSelectionField: pluralModelApiIdentifier$6,
      namespace: null,
      variables: { ids: { required: true, type: "[GadgetID!]" } },
      paramOnlyVariables: [],
      defaultSelection: null
    },
    {
      type: "action",
      operationName: "upsertConversation",
      operationReturnType: "UpsertConversation",
      functionName: "upsert",
      namespace: null,
      modelApiIdentifier: modelApiIdentifier$6,
      operatesWithRecordIdentity: false,
      modelSelectionField: modelApiIdentifier$6,
      isBulk: false,
      isDeleter: false,
      variables: {
        on: { required: false, type: "[String!]" },
        conversation: { required: false, type: "UpsertConversationInput" }
      },
      hasAmbiguousIdentifier: false,
      paramOnlyVariables: ["on"],
      hasReturnType: {
        "... on CreateConversationResult": { hasReturnType: false },
        "... on UpdateConversationResult": { hasReturnType: false }
      },
      acceptsModelInput: true,
      hasCreateOrUpdateEffect: true,
      defaultSelection: DefaultConversationSelection
    },
    {
      type: "action",
      operationName: "bulkUpsertConversations",
      functionName: "bulkUpsert",
      isBulk: true,
      isDeleter: false,
      hasReturnType: false,
      acceptsModelInput: true,
      operatesWithRecordIdentity: false,
      singleActionFunctionName: "upsert",
      modelApiIdentifier: modelApiIdentifier$6,
      modelSelectionField: pluralModelApiIdentifier$6,
      namespace: null,
      variables: {
        inputs: { required: true, type: "[BulkUpsertConversationsInput!]" }
      },
      paramOnlyVariables: ["on"],
      defaultSelection: DefaultConversationSelection
    },
    {
      type: "computedView",
      operationName: "view",
      functionName: "view",
      gqlFieldName: "conversationGellyView",
      namespace: null,
      variables: {
        query: { type: "String", required: true },
        args: { type: "JSONObject" }
      }
    }
  ];
  const ConversationManager = buildModelManager(
    modelApiIdentifier$6,
    pluralModelApiIdentifier$6,
    DefaultConversationSelection,
    operations$6
  );
  const DefaultMessageSelection = {
    __typename: true,
    id: true,
    attachment: { url: true, mimeType: true, fileName: true },
    content: true,
    conversationId: true,
    createdAt: true,
    emailDeliveredAt: true,
    emailReadAt: true,
    emailSentAt: true,
    senderType: true,
    updatedAt: true,
    userId: true
  };
  const modelApiIdentifier$5 = "message";
  const pluralModelApiIdentifier$5 = "messages";
  const operations$5 = [
    {
      type: "findOne",
      operationName: modelApiIdentifier$5,
      modelApiIdentifier: modelApiIdentifier$5,
      findByVariableName: "id",
      defaultSelection: DefaultMessageSelection,
      namespace: null
    },
    {
      type: "maybeFindOne",
      operationName: modelApiIdentifier$5,
      modelApiIdentifier: modelApiIdentifier$5,
      findByVariableName: "id",
      defaultSelection: DefaultMessageSelection,
      namespace: null
    },
    {
      type: "findMany",
      operationName: pluralModelApiIdentifier$5,
      modelApiIdentifier: modelApiIdentifier$5,
      defaultSelection: DefaultMessageSelection,
      namespace: null
    },
    {
      type: "findFirst",
      operationName: pluralModelApiIdentifier$5,
      modelApiIdentifier: modelApiIdentifier$5,
      defaultSelection: DefaultMessageSelection,
      namespace: null
    },
    {
      type: "maybeFindFirst",
      operationName: pluralModelApiIdentifier$5,
      modelApiIdentifier: modelApiIdentifier$5,
      defaultSelection: DefaultMessageSelection,
      namespace: null
    },
    {
      type: "findOne",
      operationName: pluralModelApiIdentifier$5,
      functionName: "findById",
      findByField: "id",
      findByVariableName: "id",
      modelApiIdentifier: modelApiIdentifier$5,
      defaultSelection: DefaultMessageSelection,
      namespace: null
    },
    {
      type: "maybeFindOne",
      operationName: pluralModelApiIdentifier$5,
      functionName: "maybeFindById",
      findByField: "id",
      findByVariableName: "id",
      modelApiIdentifier: modelApiIdentifier$5,
      defaultSelection: DefaultMessageSelection,
      namespace: null
    },
    {
      type: "action",
      operationName: "createMessage",
      operationReturnType: "CreateMessage",
      functionName: "create",
      namespace: null,
      modelApiIdentifier: modelApiIdentifier$5,
      operatesWithRecordIdentity: false,
      modelSelectionField: modelApiIdentifier$5,
      isBulk: false,
      isDeleter: false,
      variables: { message: { required: false, type: "CreateMessageInput" } },
      hasAmbiguousIdentifier: false,
      paramOnlyVariables: [],
      hasReturnType: false,
      acceptsModelInput: true,
      hasCreateOrUpdateEffect: true,
      defaultSelection: DefaultMessageSelection
    },
    {
      type: "action",
      operationName: "bulkCreateMessages",
      functionName: "bulkCreate",
      isBulk: true,
      isDeleter: false,
      hasReturnType: false,
      acceptsModelInput: true,
      operatesWithRecordIdentity: false,
      singleActionFunctionName: "create",
      modelApiIdentifier: modelApiIdentifier$5,
      modelSelectionField: pluralModelApiIdentifier$5,
      namespace: null,
      variables: { inputs: { required: true, type: "[BulkCreateMessagesInput!]" } },
      paramOnlyVariables: [],
      defaultSelection: DefaultMessageSelection
    },
    {
      type: "action",
      operationName: "deleteMessage",
      operationReturnType: "DeleteMessage",
      functionName: "delete",
      namespace: null,
      modelApiIdentifier: modelApiIdentifier$5,
      operatesWithRecordIdentity: true,
      modelSelectionField: modelApiIdentifier$5,
      isBulk: false,
      isDeleter: true,
      variables: { id: { required: true, type: "GadgetID" } },
      hasAmbiguousIdentifier: false,
      paramOnlyVariables: [],
      hasReturnType: false,
      acceptsModelInput: false,
      hasCreateOrUpdateEffect: false,
      defaultSelection: null
    },
    {
      type: "action",
      operationName: "bulkDeleteMessages",
      functionName: "bulkDelete",
      isBulk: true,
      isDeleter: true,
      hasReturnType: false,
      acceptsModelInput: false,
      operatesWithRecordIdentity: true,
      singleActionFunctionName: "delete",
      modelApiIdentifier: modelApiIdentifier$5,
      modelSelectionField: pluralModelApiIdentifier$5,
      namespace: null,
      variables: { ids: { required: true, type: "[GadgetID!]" } },
      paramOnlyVariables: [],
      defaultSelection: null
    },
    {
      type: "computedView",
      operationName: "view",
      functionName: "view",
      gqlFieldName: "messageGellyView",
      namespace: null,
      variables: {
        query: { type: "String", required: true },
        args: { type: "JSONObject" }
      }
    }
  ];
  const MessageManager = buildModelManager(
    modelApiIdentifier$5,
    pluralModelApiIdentifier$5,
    DefaultMessageSelection,
    operations$5
  );
  const DefaultOrganizationSelection = {
    __typename: true,
    id: true,
    accessToken: true,
    createdAt: true,
    name: true,
    slug: true,
    updatedAt: true
  };
  const modelApiIdentifier$4 = "organization";
  const pluralModelApiIdentifier$4 = "organizations";
  const operations$4 = [
    {
      type: "findOne",
      operationName: modelApiIdentifier$4,
      modelApiIdentifier: modelApiIdentifier$4,
      findByVariableName: "id",
      defaultSelection: DefaultOrganizationSelection,
      namespace: null
    },
    {
      type: "maybeFindOne",
      operationName: modelApiIdentifier$4,
      modelApiIdentifier: modelApiIdentifier$4,
      findByVariableName: "id",
      defaultSelection: DefaultOrganizationSelection,
      namespace: null
    },
    {
      type: "findMany",
      operationName: pluralModelApiIdentifier$4,
      modelApiIdentifier: modelApiIdentifier$4,
      defaultSelection: DefaultOrganizationSelection,
      namespace: null
    },
    {
      type: "findFirst",
      operationName: pluralModelApiIdentifier$4,
      modelApiIdentifier: modelApiIdentifier$4,
      defaultSelection: DefaultOrganizationSelection,
      namespace: null
    },
    {
      type: "maybeFindFirst",
      operationName: pluralModelApiIdentifier$4,
      modelApiIdentifier: modelApiIdentifier$4,
      defaultSelection: DefaultOrganizationSelection,
      namespace: null
    },
    {
      type: "findOne",
      operationName: pluralModelApiIdentifier$4,
      functionName: "findById",
      findByField: "id",
      findByVariableName: "id",
      modelApiIdentifier: modelApiIdentifier$4,
      defaultSelection: DefaultOrganizationSelection,
      namespace: null
    },
    {
      type: "maybeFindOne",
      operationName: pluralModelApiIdentifier$4,
      functionName: "maybeFindById",
      findByField: "id",
      findByVariableName: "id",
      modelApiIdentifier: modelApiIdentifier$4,
      defaultSelection: DefaultOrganizationSelection,
      namespace: null
    },
    {
      type: "findOne",
      operationName: pluralModelApiIdentifier$4,
      functionName: "findBySlug",
      findByField: "slug",
      findByVariableName: "slug",
      modelApiIdentifier: modelApiIdentifier$4,
      defaultSelection: DefaultOrganizationSelection,
      namespace: null
    },
    {
      type: "maybeFindOne",
      operationName: pluralModelApiIdentifier$4,
      functionName: "maybeFindBySlug",
      findByField: "slug",
      findByVariableName: "slug",
      modelApiIdentifier: modelApiIdentifier$4,
      defaultSelection: DefaultOrganizationSelection,
      namespace: null
    },
    {
      type: "action",
      operationName: "createOrganization",
      operationReturnType: "CreateOrganization",
      functionName: "create",
      namespace: null,
      modelApiIdentifier: modelApiIdentifier$4,
      operatesWithRecordIdentity: false,
      modelSelectionField: modelApiIdentifier$4,
      isBulk: false,
      isDeleter: false,
      variables: {
        organization: { required: false, type: "CreateOrganizationInput" }
      },
      hasAmbiguousIdentifier: false,
      paramOnlyVariables: [],
      hasReturnType: false,
      acceptsModelInput: true,
      hasCreateOrUpdateEffect: true,
      defaultSelection: DefaultOrganizationSelection
    },
    {
      type: "action",
      operationName: "bulkCreateOrganizations",
      functionName: "bulkCreate",
      isBulk: true,
      isDeleter: false,
      hasReturnType: false,
      acceptsModelInput: true,
      operatesWithRecordIdentity: false,
      singleActionFunctionName: "create",
      modelApiIdentifier: modelApiIdentifier$4,
      modelSelectionField: pluralModelApiIdentifier$4,
      namespace: null,
      variables: {
        inputs: { required: true, type: "[BulkCreateOrganizationsInput!]" }
      },
      paramOnlyVariables: [],
      defaultSelection: DefaultOrganizationSelection
    },
    {
      type: "action",
      operationName: "updateOrganization",
      operationReturnType: "UpdateOrganization",
      functionName: "update",
      namespace: null,
      modelApiIdentifier: modelApiIdentifier$4,
      operatesWithRecordIdentity: true,
      modelSelectionField: modelApiIdentifier$4,
      isBulk: false,
      isDeleter: false,
      variables: {
        id: { required: true, type: "GadgetID" },
        organization: { required: false, type: "UpdateOrganizationInput" }
      },
      hasAmbiguousIdentifier: false,
      paramOnlyVariables: [],
      hasReturnType: false,
      acceptsModelInput: true,
      hasCreateOrUpdateEffect: true,
      defaultSelection: DefaultOrganizationSelection
    },
    {
      type: "action",
      operationName: "bulkUpdateOrganizations",
      functionName: "bulkUpdate",
      isBulk: true,
      isDeleter: false,
      hasReturnType: false,
      acceptsModelInput: true,
      operatesWithRecordIdentity: true,
      singleActionFunctionName: "update",
      modelApiIdentifier: modelApiIdentifier$4,
      modelSelectionField: pluralModelApiIdentifier$4,
      namespace: null,
      variables: {
        inputs: { required: true, type: "[BulkUpdateOrganizationsInput!]" }
      },
      paramOnlyVariables: [],
      defaultSelection: DefaultOrganizationSelection
    },
    {
      type: "action",
      operationName: "deleteOrganization",
      operationReturnType: "DeleteOrganization",
      functionName: "delete",
      namespace: null,
      modelApiIdentifier: modelApiIdentifier$4,
      operatesWithRecordIdentity: true,
      modelSelectionField: modelApiIdentifier$4,
      isBulk: false,
      isDeleter: true,
      variables: { id: { required: true, type: "GadgetID" } },
      hasAmbiguousIdentifier: false,
      paramOnlyVariables: [],
      hasReturnType: false,
      acceptsModelInput: false,
      hasCreateOrUpdateEffect: false,
      defaultSelection: null
    },
    {
      type: "action",
      operationName: "bulkDeleteOrganizations",
      functionName: "bulkDelete",
      isBulk: true,
      isDeleter: true,
      hasReturnType: false,
      acceptsModelInput: false,
      operatesWithRecordIdentity: true,
      singleActionFunctionName: "delete",
      modelApiIdentifier: modelApiIdentifier$4,
      modelSelectionField: pluralModelApiIdentifier$4,
      namespace: null,
      variables: { ids: { required: true, type: "[GadgetID!]" } },
      paramOnlyVariables: [],
      defaultSelection: null
    },
    {
      type: "action",
      operationName: "upsertOrganization",
      operationReturnType: "UpsertOrganization",
      functionName: "upsert",
      namespace: null,
      modelApiIdentifier: modelApiIdentifier$4,
      operatesWithRecordIdentity: false,
      modelSelectionField: modelApiIdentifier$4,
      isBulk: false,
      isDeleter: false,
      variables: {
        on: { required: false, type: "[String!]" },
        organization: { required: false, type: "UpsertOrganizationInput" }
      },
      hasAmbiguousIdentifier: false,
      paramOnlyVariables: ["on"],
      hasReturnType: {
        "... on CreateOrganizationResult": { hasReturnType: false },
        "... on UpdateOrganizationResult": { hasReturnType: false }
      },
      acceptsModelInput: true,
      hasCreateOrUpdateEffect: true,
      defaultSelection: DefaultOrganizationSelection
    },
    {
      type: "action",
      operationName: "bulkUpsertOrganizations",
      functionName: "bulkUpsert",
      isBulk: true,
      isDeleter: false,
      hasReturnType: false,
      acceptsModelInput: true,
      operatesWithRecordIdentity: false,
      singleActionFunctionName: "upsert",
      modelApiIdentifier: modelApiIdentifier$4,
      modelSelectionField: pluralModelApiIdentifier$4,
      namespace: null,
      variables: {
        inputs: { required: true, type: "[BulkUpsertOrganizationsInput!]" }
      },
      paramOnlyVariables: ["on"],
      defaultSelection: DefaultOrganizationSelection
    },
    {
      type: "computedView",
      operationName: "view",
      functionName: "view",
      gqlFieldName: "organizationGellyView",
      namespace: null,
      variables: {
        query: { type: "String", required: true },
        args: { type: "JSONObject" }
      }
    }
  ];
  const OrganizationManager = buildModelManager(
    modelApiIdentifier$4,
    pluralModelApiIdentifier$4,
    DefaultOrganizationSelection,
    operations$4
  );
  const DefaultCustomerSelection = {
    __typename: true,
    id: true,
    country: true,
    createdAt: true,
    email: true,
    lastActiveAt: true,
    name: true,
    updatedAt: true
  };
  const modelApiIdentifier$3 = "customer";
  const pluralModelApiIdentifier$3 = "customers";
  const operations$3 = [
    {
      type: "findOne",
      operationName: modelApiIdentifier$3,
      modelApiIdentifier: modelApiIdentifier$3,
      findByVariableName: "id",
      defaultSelection: DefaultCustomerSelection,
      namespace: null
    },
    {
      type: "maybeFindOne",
      operationName: modelApiIdentifier$3,
      modelApiIdentifier: modelApiIdentifier$3,
      findByVariableName: "id",
      defaultSelection: DefaultCustomerSelection,
      namespace: null
    },
    {
      type: "findMany",
      operationName: pluralModelApiIdentifier$3,
      modelApiIdentifier: modelApiIdentifier$3,
      defaultSelection: DefaultCustomerSelection,
      namespace: null
    },
    {
      type: "findFirst",
      operationName: pluralModelApiIdentifier$3,
      modelApiIdentifier: modelApiIdentifier$3,
      defaultSelection: DefaultCustomerSelection,
      namespace: null
    },
    {
      type: "maybeFindFirst",
      operationName: pluralModelApiIdentifier$3,
      modelApiIdentifier: modelApiIdentifier$3,
      defaultSelection: DefaultCustomerSelection,
      namespace: null
    },
    {
      type: "findOne",
      operationName: pluralModelApiIdentifier$3,
      functionName: "findById",
      findByField: "id",
      findByVariableName: "id",
      modelApiIdentifier: modelApiIdentifier$3,
      defaultSelection: DefaultCustomerSelection,
      namespace: null
    },
    {
      type: "maybeFindOne",
      operationName: pluralModelApiIdentifier$3,
      functionName: "maybeFindById",
      findByField: "id",
      findByVariableName: "id",
      modelApiIdentifier: modelApiIdentifier$3,
      defaultSelection: DefaultCustomerSelection,
      namespace: null
    },
    {
      type: "action",
      operationName: "createCustomer",
      operationReturnType: "CreateCustomer",
      functionName: "create",
      namespace: null,
      modelApiIdentifier: modelApiIdentifier$3,
      operatesWithRecordIdentity: false,
      modelSelectionField: modelApiIdentifier$3,
      isBulk: false,
      isDeleter: false,
      variables: { customer: { required: false, type: "CreateCustomerInput" } },
      hasAmbiguousIdentifier: false,
      paramOnlyVariables: [],
      hasReturnType: false,
      acceptsModelInput: true,
      hasCreateOrUpdateEffect: true,
      defaultSelection: DefaultCustomerSelection
    },
    {
      type: "action",
      operationName: "bulkCreateCustomers",
      functionName: "bulkCreate",
      isBulk: true,
      isDeleter: false,
      hasReturnType: false,
      acceptsModelInput: true,
      operatesWithRecordIdentity: false,
      singleActionFunctionName: "create",
      modelApiIdentifier: modelApiIdentifier$3,
      modelSelectionField: pluralModelApiIdentifier$3,
      namespace: null,
      variables: { inputs: { required: true, type: "[BulkCreateCustomersInput!]" } },
      paramOnlyVariables: [],
      defaultSelection: DefaultCustomerSelection
    },
    {
      type: "action",
      operationName: "updateCustomer",
      operationReturnType: "UpdateCustomer",
      functionName: "update",
      namespace: null,
      modelApiIdentifier: modelApiIdentifier$3,
      operatesWithRecordIdentity: true,
      modelSelectionField: modelApiIdentifier$3,
      isBulk: false,
      isDeleter: false,
      variables: {
        id: { required: true, type: "GadgetID" },
        customer: { required: false, type: "UpdateCustomerInput" }
      },
      hasAmbiguousIdentifier: false,
      paramOnlyVariables: [],
      hasReturnType: false,
      acceptsModelInput: true,
      hasCreateOrUpdateEffect: true,
      defaultSelection: DefaultCustomerSelection
    },
    {
      type: "action",
      operationName: "bulkUpdateCustomers",
      functionName: "bulkUpdate",
      isBulk: true,
      isDeleter: false,
      hasReturnType: false,
      acceptsModelInput: true,
      operatesWithRecordIdentity: true,
      singleActionFunctionName: "update",
      modelApiIdentifier: modelApiIdentifier$3,
      modelSelectionField: pluralModelApiIdentifier$3,
      namespace: null,
      variables: { inputs: { required: true, type: "[BulkUpdateCustomersInput!]" } },
      paramOnlyVariables: [],
      defaultSelection: DefaultCustomerSelection
    },
    {
      type: "action",
      operationName: "deleteCustomer",
      operationReturnType: "DeleteCustomer",
      functionName: "delete",
      namespace: null,
      modelApiIdentifier: modelApiIdentifier$3,
      operatesWithRecordIdentity: true,
      modelSelectionField: modelApiIdentifier$3,
      isBulk: false,
      isDeleter: true,
      variables: { id: { required: true, type: "GadgetID" } },
      hasAmbiguousIdentifier: false,
      paramOnlyVariables: [],
      hasReturnType: false,
      acceptsModelInput: false,
      hasCreateOrUpdateEffect: false,
      defaultSelection: null
    },
    {
      type: "action",
      operationName: "bulkDeleteCustomers",
      functionName: "bulkDelete",
      isBulk: true,
      isDeleter: true,
      hasReturnType: false,
      acceptsModelInput: false,
      operatesWithRecordIdentity: true,
      singleActionFunctionName: "delete",
      modelApiIdentifier: modelApiIdentifier$3,
      modelSelectionField: pluralModelApiIdentifier$3,
      namespace: null,
      variables: { ids: { required: true, type: "[GadgetID!]" } },
      paramOnlyVariables: [],
      defaultSelection: null
    },
    {
      type: "action",
      operationName: "upsertCustomer",
      operationReturnType: "UpsertCustomer",
      functionName: "upsert",
      namespace: null,
      modelApiIdentifier: modelApiIdentifier$3,
      operatesWithRecordIdentity: false,
      modelSelectionField: modelApiIdentifier$3,
      isBulk: false,
      isDeleter: false,
      variables: {
        on: { required: false, type: "[String!]" },
        customer: { required: false, type: "UpsertCustomerInput" }
      },
      hasAmbiguousIdentifier: false,
      paramOnlyVariables: ["on"],
      hasReturnType: {
        "... on CreateCustomerResult": { hasReturnType: false },
        "... on UpdateCustomerResult": { hasReturnType: false }
      },
      acceptsModelInput: true,
      hasCreateOrUpdateEffect: true,
      defaultSelection: DefaultCustomerSelection
    },
    {
      type: "action",
      operationName: "bulkUpsertCustomers",
      functionName: "bulkUpsert",
      isBulk: true,
      isDeleter: false,
      hasReturnType: false,
      acceptsModelInput: true,
      operatesWithRecordIdentity: false,
      singleActionFunctionName: "upsert",
      modelApiIdentifier: modelApiIdentifier$3,
      modelSelectionField: pluralModelApiIdentifier$3,
      namespace: null,
      variables: { inputs: { required: true, type: "[BulkUpsertCustomersInput!]" } },
      paramOnlyVariables: ["on"],
      defaultSelection: DefaultCustomerSelection
    },
    {
      type: "computedView",
      operationName: "view",
      functionName: "view",
      gqlFieldName: "customerGellyView",
      namespace: null,
      variables: {
        query: { type: "String", required: true },
        args: { type: "JSONObject" }
      }
    }
  ];
  const CustomerManager = buildModelManager(
    modelApiIdentifier$3,
    pluralModelApiIdentifier$3,
    DefaultCustomerSelection,
    operations$3
  );
  const DefaultTestModelSelection = {
    __typename: true,
    id: true,
    createdAt: true,
    updatedAt: true,
    userId: true
  };
  const modelApiIdentifier$2 = "testModel";
  const pluralModelApiIdentifier$2 = "testModels";
  const operations$2 = [
    {
      type: "findOne",
      operationName: modelApiIdentifier$2,
      modelApiIdentifier: modelApiIdentifier$2,
      findByVariableName: "id",
      defaultSelection: DefaultTestModelSelection,
      namespace: null
    },
    {
      type: "maybeFindOne",
      operationName: modelApiIdentifier$2,
      modelApiIdentifier: modelApiIdentifier$2,
      findByVariableName: "id",
      defaultSelection: DefaultTestModelSelection,
      namespace: null
    },
    {
      type: "findMany",
      operationName: pluralModelApiIdentifier$2,
      modelApiIdentifier: modelApiIdentifier$2,
      defaultSelection: DefaultTestModelSelection,
      namespace: null
    },
    {
      type: "findFirst",
      operationName: pluralModelApiIdentifier$2,
      modelApiIdentifier: modelApiIdentifier$2,
      defaultSelection: DefaultTestModelSelection,
      namespace: null
    },
    {
      type: "maybeFindFirst",
      operationName: pluralModelApiIdentifier$2,
      modelApiIdentifier: modelApiIdentifier$2,
      defaultSelection: DefaultTestModelSelection,
      namespace: null
    },
    {
      type: "findOne",
      operationName: pluralModelApiIdentifier$2,
      functionName: "findById",
      findByField: "id",
      findByVariableName: "id",
      modelApiIdentifier: modelApiIdentifier$2,
      defaultSelection: DefaultTestModelSelection,
      namespace: null
    },
    {
      type: "maybeFindOne",
      operationName: pluralModelApiIdentifier$2,
      functionName: "maybeFindById",
      findByField: "id",
      findByVariableName: "id",
      modelApiIdentifier: modelApiIdentifier$2,
      defaultSelection: DefaultTestModelSelection,
      namespace: null
    },
    {
      type: "action",
      operationName: "createTestModel",
      operationReturnType: "CreateTestModel",
      functionName: "create",
      namespace: null,
      modelApiIdentifier: modelApiIdentifier$2,
      operatesWithRecordIdentity: false,
      modelSelectionField: modelApiIdentifier$2,
      isBulk: false,
      isDeleter: false,
      variables: { testModel: { required: false, type: "CreateTestModelInput" } },
      hasAmbiguousIdentifier: false,
      paramOnlyVariables: [],
      hasReturnType: false,
      acceptsModelInput: true,
      hasCreateOrUpdateEffect: true,
      defaultSelection: DefaultTestModelSelection
    },
    {
      type: "action",
      operationName: "bulkCreateTestModels",
      functionName: "bulkCreate",
      isBulk: true,
      isDeleter: false,
      hasReturnType: false,
      acceptsModelInput: true,
      operatesWithRecordIdentity: false,
      singleActionFunctionName: "create",
      modelApiIdentifier: modelApiIdentifier$2,
      modelSelectionField: pluralModelApiIdentifier$2,
      namespace: null,
      variables: {
        inputs: { required: true, type: "[BulkCreateTestModelsInput!]" }
      },
      paramOnlyVariables: [],
      defaultSelection: DefaultTestModelSelection
    },
    {
      type: "action",
      operationName: "updateTestModel",
      operationReturnType: "UpdateTestModel",
      functionName: "update",
      namespace: null,
      modelApiIdentifier: modelApiIdentifier$2,
      operatesWithRecordIdentity: true,
      modelSelectionField: modelApiIdentifier$2,
      isBulk: false,
      isDeleter: false,
      variables: {
        id: { required: true, type: "GadgetID" },
        testModel: { required: false, type: "UpdateTestModelInput" }
      },
      hasAmbiguousIdentifier: false,
      paramOnlyVariables: [],
      hasReturnType: false,
      acceptsModelInput: true,
      hasCreateOrUpdateEffect: true,
      defaultSelection: DefaultTestModelSelection
    },
    {
      type: "action",
      operationName: "bulkUpdateTestModels",
      functionName: "bulkUpdate",
      isBulk: true,
      isDeleter: false,
      hasReturnType: false,
      acceptsModelInput: true,
      operatesWithRecordIdentity: true,
      singleActionFunctionName: "update",
      modelApiIdentifier: modelApiIdentifier$2,
      modelSelectionField: pluralModelApiIdentifier$2,
      namespace: null,
      variables: {
        inputs: { required: true, type: "[BulkUpdateTestModelsInput!]" }
      },
      paramOnlyVariables: [],
      defaultSelection: DefaultTestModelSelection
    },
    {
      type: "action",
      operationName: "deleteTestModel",
      operationReturnType: "DeleteTestModel",
      functionName: "delete",
      namespace: null,
      modelApiIdentifier: modelApiIdentifier$2,
      operatesWithRecordIdentity: true,
      modelSelectionField: modelApiIdentifier$2,
      isBulk: false,
      isDeleter: true,
      variables: { id: { required: true, type: "GadgetID" } },
      hasAmbiguousIdentifier: false,
      paramOnlyVariables: [],
      hasReturnType: false,
      acceptsModelInput: false,
      hasCreateOrUpdateEffect: false,
      defaultSelection: null
    },
    {
      type: "action",
      operationName: "bulkDeleteTestModels",
      functionName: "bulkDelete",
      isBulk: true,
      isDeleter: true,
      hasReturnType: false,
      acceptsModelInput: false,
      operatesWithRecordIdentity: true,
      singleActionFunctionName: "delete",
      modelApiIdentifier: modelApiIdentifier$2,
      modelSelectionField: pluralModelApiIdentifier$2,
      namespace: null,
      variables: { ids: { required: true, type: "[GadgetID!]" } },
      paramOnlyVariables: [],
      defaultSelection: null
    },
    {
      type: "action",
      operationName: "upsertTestModel",
      operationReturnType: "UpsertTestModel",
      functionName: "upsert",
      namespace: null,
      modelApiIdentifier: modelApiIdentifier$2,
      operatesWithRecordIdentity: false,
      modelSelectionField: modelApiIdentifier$2,
      isBulk: false,
      isDeleter: false,
      variables: {
        on: { required: false, type: "[String!]" },
        testModel: { required: false, type: "UpsertTestModelInput" }
      },
      hasAmbiguousIdentifier: false,
      paramOnlyVariables: ["on"],
      hasReturnType: {
        "... on CreateTestModelResult": { hasReturnType: false },
        "... on UpdateTestModelResult": { hasReturnType: false }
      },
      acceptsModelInput: true,
      hasCreateOrUpdateEffect: true,
      defaultSelection: DefaultTestModelSelection
    },
    {
      type: "action",
      operationName: "bulkUpsertTestModels",
      functionName: "bulkUpsert",
      isBulk: true,
      isDeleter: false,
      hasReturnType: false,
      acceptsModelInput: true,
      operatesWithRecordIdentity: false,
      singleActionFunctionName: "upsert",
      modelApiIdentifier: modelApiIdentifier$2,
      modelSelectionField: pluralModelApiIdentifier$2,
      namespace: null,
      variables: {
        inputs: { required: true, type: "[BulkUpsertTestModelsInput!]" }
      },
      paramOnlyVariables: ["on"],
      defaultSelection: DefaultTestModelSelection
    },
    {
      type: "computedView",
      operationName: "view",
      functionName: "view",
      gqlFieldName: "testModelGellyView",
      namespace: null,
      variables: {
        query: { type: "String", required: true },
        args: { type: "JSONObject" }
      }
    }
  ];
  const TestModelManager = buildModelManager(
    modelApiIdentifier$2,
    pluralModelApiIdentifier$2,
    DefaultTestModelSelection,
    operations$2
  );
  const DefaultAnalyticsFIVESelection = {
    __typename: true,
    id: true,
    createdAt: true,
    distinctId: true,
    event: true,
    properties: true,
    sessionId: true,
    shopId: true,
    timestamp: true,
    updatedAt: true,
    userId: true
  };
  const modelApiIdentifier$1 = "analyticsFIVE";
  const pluralModelApiIdentifier$1 = "analyticsFIVEs";
  const operations$1 = [
    {
      type: "findOne",
      operationName: modelApiIdentifier$1,
      modelApiIdentifier: modelApiIdentifier$1,
      findByVariableName: "id",
      defaultSelection: DefaultAnalyticsFIVESelection,
      namespace: null
    },
    {
      type: "maybeFindOne",
      operationName: modelApiIdentifier$1,
      modelApiIdentifier: modelApiIdentifier$1,
      findByVariableName: "id",
      defaultSelection: DefaultAnalyticsFIVESelection,
      namespace: null
    },
    {
      type: "findMany",
      operationName: pluralModelApiIdentifier$1,
      modelApiIdentifier: modelApiIdentifier$1,
      defaultSelection: DefaultAnalyticsFIVESelection,
      namespace: null
    },
    {
      type: "findFirst",
      operationName: pluralModelApiIdentifier$1,
      modelApiIdentifier: modelApiIdentifier$1,
      defaultSelection: DefaultAnalyticsFIVESelection,
      namespace: null
    },
    {
      type: "maybeFindFirst",
      operationName: pluralModelApiIdentifier$1,
      modelApiIdentifier: modelApiIdentifier$1,
      defaultSelection: DefaultAnalyticsFIVESelection,
      namespace: null
    },
    {
      type: "findOne",
      operationName: pluralModelApiIdentifier$1,
      functionName: "findById",
      findByField: "id",
      findByVariableName: "id",
      modelApiIdentifier: modelApiIdentifier$1,
      defaultSelection: DefaultAnalyticsFIVESelection,
      namespace: null
    },
    {
      type: "maybeFindOne",
      operationName: pluralModelApiIdentifier$1,
      functionName: "maybeFindById",
      findByField: "id",
      findByVariableName: "id",
      modelApiIdentifier: modelApiIdentifier$1,
      defaultSelection: DefaultAnalyticsFIVESelection,
      namespace: null
    },
    {
      type: "action",
      operationName: "createAnalyticsFIVE",
      operationReturnType: "CreateAnalyticsFIVE",
      functionName: "create",
      namespace: null,
      modelApiIdentifier: modelApiIdentifier$1,
      operatesWithRecordIdentity: false,
      modelSelectionField: modelApiIdentifier$1,
      isBulk: false,
      isDeleter: false,
      variables: {
        analyticsFIVE: { required: false, type: "CreateAnalyticsFIVEInput" }
      },
      hasAmbiguousIdentifier: false,
      paramOnlyVariables: [],
      hasReturnType: false,
      acceptsModelInput: true,
      hasCreateOrUpdateEffect: true,
      defaultSelection: DefaultAnalyticsFIVESelection
    },
    {
      type: "action",
      operationName: "bulkCreateAnalyticsFIVEs",
      functionName: "bulkCreate",
      isBulk: true,
      isDeleter: false,
      hasReturnType: false,
      acceptsModelInput: true,
      operatesWithRecordIdentity: false,
      singleActionFunctionName: "create",
      modelApiIdentifier: modelApiIdentifier$1,
      modelSelectionField: pluralModelApiIdentifier$1,
      namespace: null,
      variables: {
        inputs: { required: true, type: "[BulkCreateAnalyticsFIVEsInput!]" }
      },
      paramOnlyVariables: [],
      defaultSelection: DefaultAnalyticsFIVESelection
    },
    {
      type: "action",
      operationName: "updateAnalyticsFIVE",
      operationReturnType: "UpdateAnalyticsFIVE",
      functionName: "update",
      namespace: null,
      modelApiIdentifier: modelApiIdentifier$1,
      operatesWithRecordIdentity: true,
      modelSelectionField: modelApiIdentifier$1,
      isBulk: false,
      isDeleter: false,
      variables: {
        id: { required: true, type: "GadgetID" },
        analyticsFIVE: { required: false, type: "UpdateAnalyticsFIVEInput" }
      },
      hasAmbiguousIdentifier: false,
      paramOnlyVariables: [],
      hasReturnType: false,
      acceptsModelInput: true,
      hasCreateOrUpdateEffect: true,
      defaultSelection: DefaultAnalyticsFIVESelection
    },
    {
      type: "action",
      operationName: "bulkUpdateAnalyticsFIVEs",
      functionName: "bulkUpdate",
      isBulk: true,
      isDeleter: false,
      hasReturnType: false,
      acceptsModelInput: true,
      operatesWithRecordIdentity: true,
      singleActionFunctionName: "update",
      modelApiIdentifier: modelApiIdentifier$1,
      modelSelectionField: pluralModelApiIdentifier$1,
      namespace: null,
      variables: {
        inputs: { required: true, type: "[BulkUpdateAnalyticsFIVEsInput!]" }
      },
      paramOnlyVariables: [],
      defaultSelection: DefaultAnalyticsFIVESelection
    },
    {
      type: "action",
      operationName: "deleteAnalyticsFIVE",
      operationReturnType: "DeleteAnalyticsFIVE",
      functionName: "delete",
      namespace: null,
      modelApiIdentifier: modelApiIdentifier$1,
      operatesWithRecordIdentity: true,
      modelSelectionField: modelApiIdentifier$1,
      isBulk: false,
      isDeleter: true,
      variables: { id: { required: true, type: "GadgetID" } },
      hasAmbiguousIdentifier: false,
      paramOnlyVariables: [],
      hasReturnType: false,
      acceptsModelInput: false,
      hasCreateOrUpdateEffect: false,
      defaultSelection: null
    },
    {
      type: "action",
      operationName: "bulkDeleteAnalyticsFIVEs",
      functionName: "bulkDelete",
      isBulk: true,
      isDeleter: true,
      hasReturnType: false,
      acceptsModelInput: false,
      operatesWithRecordIdentity: true,
      singleActionFunctionName: "delete",
      modelApiIdentifier: modelApiIdentifier$1,
      modelSelectionField: pluralModelApiIdentifier$1,
      namespace: null,
      variables: { ids: { required: true, type: "[GadgetID!]" } },
      paramOnlyVariables: [],
      defaultSelection: null
    },
    {
      type: "action",
      operationName: "upsertAnalyticsFIVE",
      operationReturnType: "UpsertAnalyticsFIVE",
      functionName: "upsert",
      namespace: null,
      modelApiIdentifier: modelApiIdentifier$1,
      operatesWithRecordIdentity: false,
      modelSelectionField: modelApiIdentifier$1,
      isBulk: false,
      isDeleter: false,
      variables: {
        on: { required: false, type: "[String!]" },
        analyticsFIVE: { required: false, type: "UpsertAnalyticsFIVEInput" }
      },
      hasAmbiguousIdentifier: false,
      paramOnlyVariables: ["on"],
      hasReturnType: {
        "... on CreateAnalyticsFIVEResult": { hasReturnType: false },
        "... on UpdateAnalyticsFIVEResult": { hasReturnType: false }
      },
      acceptsModelInput: true,
      hasCreateOrUpdateEffect: true,
      defaultSelection: DefaultAnalyticsFIVESelection
    },
    {
      type: "action",
      operationName: "bulkUpsertAnalyticsFIVEs",
      functionName: "bulkUpsert",
      isBulk: true,
      isDeleter: false,
      hasReturnType: false,
      acceptsModelInput: true,
      operatesWithRecordIdentity: false,
      singleActionFunctionName: "upsert",
      modelApiIdentifier: modelApiIdentifier$1,
      modelSelectionField: pluralModelApiIdentifier$1,
      namespace: null,
      variables: {
        inputs: { required: true, type: "[BulkUpsertAnalyticsFIVEsInput!]" }
      },
      paramOnlyVariables: ["on"],
      defaultSelection: DefaultAnalyticsFIVESelection
    },
    {
      type: "computedView",
      operationName: "view",
      functionName: "view",
      gqlFieldName: "analyticsFIVEGellyView",
      namespace: null,
      variables: {
        query: { type: "String", required: true },
        args: { type: "JSONObject" }
      }
    }
  ];
  const AnalyticsFIVEManager = buildModelManager(
    modelApiIdentifier$1,
    pluralModelApiIdentifier$1,
    DefaultAnalyticsFIVESelection,
    operations$1
  );
  const DefaultShopSelection = {
    __typename: true,
    id: true,
    createdAt: true,
    domain: true,
    name: true,
    updatedAt: true,
    state: true,
    parentOrganizationId: true,
    shopId: true,
    userId: true
  };
  const modelApiIdentifier = "shop";
  const pluralModelApiIdentifier = "shops";
  const operations = [
    {
      type: "findOne",
      operationName: modelApiIdentifier,
      modelApiIdentifier,
      findByVariableName: "id",
      defaultSelection: DefaultShopSelection,
      namespace: null
    },
    {
      type: "maybeFindOne",
      operationName: modelApiIdentifier,
      modelApiIdentifier,
      findByVariableName: "id",
      defaultSelection: DefaultShopSelection,
      namespace: null
    },
    {
      type: "findMany",
      operationName: pluralModelApiIdentifier,
      modelApiIdentifier,
      defaultSelection: DefaultShopSelection,
      namespace: null
    },
    {
      type: "findFirst",
      operationName: pluralModelApiIdentifier,
      modelApiIdentifier,
      defaultSelection: DefaultShopSelection,
      namespace: null
    },
    {
      type: "maybeFindFirst",
      operationName: pluralModelApiIdentifier,
      modelApiIdentifier,
      defaultSelection: DefaultShopSelection,
      namespace: null
    },
    {
      type: "findOne",
      operationName: pluralModelApiIdentifier,
      functionName: "findById",
      findByField: "id",
      findByVariableName: "id",
      modelApiIdentifier,
      defaultSelection: DefaultShopSelection,
      namespace: null
    },
    {
      type: "maybeFindOne",
      operationName: pluralModelApiIdentifier,
      functionName: "maybeFindById",
      findByField: "id",
      findByVariableName: "id",
      modelApiIdentifier,
      defaultSelection: DefaultShopSelection,
      namespace: null
    },
    {
      type: "action",
      operationName: "createShop",
      operationReturnType: "CreateShop",
      functionName: "create",
      namespace: null,
      modelApiIdentifier,
      operatesWithRecordIdentity: false,
      modelSelectionField: modelApiIdentifier,
      isBulk: false,
      isDeleter: false,
      variables: { shop: { required: false, type: "CreateShopInput" } },
      hasAmbiguousIdentifier: false,
      paramOnlyVariables: [],
      hasReturnType: false,
      acceptsModelInput: true,
      hasCreateOrUpdateEffect: true,
      defaultSelection: DefaultShopSelection
    },
    {
      type: "action",
      operationName: "bulkCreateShops",
      functionName: "bulkCreate",
      isBulk: true,
      isDeleter: false,
      hasReturnType: false,
      acceptsModelInput: true,
      operatesWithRecordIdentity: false,
      singleActionFunctionName: "create",
      modelApiIdentifier,
      modelSelectionField: pluralModelApiIdentifier,
      namespace: null,
      variables: { inputs: { required: true, type: "[BulkCreateShopsInput!]" } },
      paramOnlyVariables: [],
      defaultSelection: DefaultShopSelection
    },
    {
      type: "action",
      operationName: "updateShop",
      operationReturnType: "UpdateShop",
      functionName: "update",
      namespace: null,
      modelApiIdentifier,
      operatesWithRecordIdentity: true,
      modelSelectionField: modelApiIdentifier,
      isBulk: false,
      isDeleter: false,
      variables: {
        id: { required: true, type: "GadgetID" },
        shop: { required: false, type: "UpdateShopInput" }
      },
      hasAmbiguousIdentifier: false,
      paramOnlyVariables: [],
      hasReturnType: false,
      acceptsModelInput: true,
      hasCreateOrUpdateEffect: true,
      defaultSelection: DefaultShopSelection
    },
    {
      type: "action",
      operationName: "bulkUpdateShops",
      functionName: "bulkUpdate",
      isBulk: true,
      isDeleter: false,
      hasReturnType: false,
      acceptsModelInput: true,
      operatesWithRecordIdentity: true,
      singleActionFunctionName: "update",
      modelApiIdentifier,
      modelSelectionField: pluralModelApiIdentifier,
      namespace: null,
      variables: { inputs: { required: true, type: "[BulkUpdateShopsInput!]" } },
      paramOnlyVariables: [],
      defaultSelection: DefaultShopSelection
    },
    {
      type: "action",
      operationName: "deleteShop",
      operationReturnType: "DeleteShop",
      functionName: "delete",
      namespace: null,
      modelApiIdentifier,
      operatesWithRecordIdentity: true,
      modelSelectionField: modelApiIdentifier,
      isBulk: false,
      isDeleter: true,
      variables: { id: { required: true, type: "GadgetID" } },
      hasAmbiguousIdentifier: false,
      paramOnlyVariables: [],
      hasReturnType: false,
      acceptsModelInput: false,
      hasCreateOrUpdateEffect: false,
      defaultSelection: null
    },
    {
      type: "action",
      operationName: "bulkDeleteShops",
      functionName: "bulkDelete",
      isBulk: true,
      isDeleter: true,
      hasReturnType: false,
      acceptsModelInput: false,
      operatesWithRecordIdentity: true,
      singleActionFunctionName: "delete",
      modelApiIdentifier,
      modelSelectionField: pluralModelApiIdentifier,
      namespace: null,
      variables: { ids: { required: true, type: "[GadgetID!]" } },
      paramOnlyVariables: [],
      defaultSelection: null
    },
    {
      type: "action",
      operationName: "upsertShop",
      operationReturnType: "UpsertShop",
      functionName: "upsert",
      namespace: null,
      modelApiIdentifier,
      operatesWithRecordIdentity: false,
      modelSelectionField: modelApiIdentifier,
      isBulk: false,
      isDeleter: false,
      variables: {
        on: { required: false, type: "[String!]" },
        shop: { required: false, type: "UpsertShopInput" }
      },
      hasAmbiguousIdentifier: false,
      paramOnlyVariables: ["on"],
      hasReturnType: {
        "... on CreateShopResult": { hasReturnType: false },
        "... on UpdateShopResult": { hasReturnType: false }
      },
      acceptsModelInput: true,
      hasCreateOrUpdateEffect: true,
      defaultSelection: DefaultShopSelection
    },
    {
      type: "action",
      operationName: "bulkUpsertShops",
      functionName: "bulkUpsert",
      isBulk: true,
      isDeleter: false,
      hasReturnType: false,
      acceptsModelInput: true,
      operatesWithRecordIdentity: false,
      singleActionFunctionName: "upsert",
      modelApiIdentifier,
      modelSelectionField: pluralModelApiIdentifier,
      namespace: null,
      variables: { inputs: { required: true, type: "[BulkUpsertShopsInput!]" } },
      paramOnlyVariables: ["on"],
      defaultSelection: DefaultShopSelection
    },
    {
      type: "computedView",
      operationName: "view",
      functionName: "view",
      gqlFieldName: "shopGellyView",
      namespace: null,
      variables: {
        query: { type: "String", required: true },
        args: { type: "JSONObject" }
      }
    }
  ];
  const ShopManager = buildModelManager(
    modelApiIdentifier,
    pluralModelApiIdentifier,
    DefaultShopSelection,
    operations
  );
  const __vite_import_meta_env__ = { "BASE_URL": "/", "DEV": false, "MODE": "production", "PROD": true, "SSR": false };
  const productionEnv = "production";
  const fallbackEnv = "development";
  const availableAuthenticationModes = [
    "apiKey",
    "browserSession",
    "anonymous",
    "internalAuthToken",
    "internal",
    "custom"
  ];
  const maybeGetAuthenticationModeOptionsFromClientOptions = (options) => {
    const topLevelAuthModes = {};
    for (const key2 of availableAuthenticationModes) {
      if (key2 in options) {
        topLevelAuthModes[key2] = options[key2];
      }
    }
    if ("authenticationMode" in options && Object.keys(topLevelAuthModes).length > 0) {
      throw new GadgetClientError(
        "Declaring authentication modes at the top level and under the `authenticationMode` key at the same time is not allowed."
      );
    }
    if ("authenticationMode" in options) {
      return options.authenticationMode;
    }
    if (Object.keys(topLevelAuthModes).length === 0) {
      return void 0;
    }
    return topLevelAuthModes;
  };
  const getImplicitEnv = () => {
    try {
      return process.env.GADGET_ENV;
    } catch (error2) {
      return void 0;
    }
  };
  class ShopappchatClient {
    constructor(options) {
      var _a, _b;
      this.$args = Symbol.for("gadget/fieldArgs");
      this.getWidgetMessages = buildGlobalAction(this, {
        type: "globalAction",
        functionName: "getWidgetMessages",
        operationName: "getWidgetMessages",
        operationReturnType: "GetWidgetMessages",
        namespace: null,
        variables: {
          conversationId: { required: false, type: "String" },
          shopId: { required: false, type: "String" }
        }
      });
      this.initWidgetTwo = buildGlobalAction(this, {
        type: "globalAction",
        functionName: "initWidgetTwo",
        operationName: "initWidgetTwo",
        operationReturnType: "InitWidgetTwo",
        namespace: null,
        variables: {
          shopId: { required: false, type: "String" },
          shopName: { required: false, type: "String" },
          orgSlug: { required: false, type: "String" },
          email: { required: false, type: "String" },
          country: { required: false, type: "String" }
        }
      });
      this.logEvent = buildGlobalAction(this, {
        type: "globalAction",
        functionName: "logEvent",
        operationName: "logEvent",
        operationReturnType: "LogEvent",
        namespace: null,
        variables: {
          event: { required: false, type: "String" },
          properties: { required: false, type: "JSONObject" },
          distinctId: { required: false, type: "String" },
          sessionId: { required: false, type: "String" }
        }
      });
      this.markConversationRead = buildGlobalAction(this, {
        type: "globalAction",
        functionName: "markConversationRead",
        operationName: "markConversationRead",
        operationReturnType: "MarkConversationRead",
        namespace: null,
        variables: {
          conversationId: { required: false, type: "String" },
          shopId: { required: false, type: "String" }
        }
      });
      this.markEmailRead = buildGlobalAction(this, {
        type: "globalAction",
        functionName: "markEmailRead",
        operationName: "markEmailRead",
        operationReturnType: "MarkEmailRead",
        namespace: null,
        variables: { messageId: { required: false, type: "String" } }
      });
      this.sendHeartbeat = buildGlobalAction(this, {
        type: "globalAction",
        functionName: "sendHeartbeat",
        operationName: "sendHeartbeat",
        operationReturnType: "SendHeartbeat",
        namespace: null,
        variables: { email: { required: false, type: "String" } }
      });
      this.sendMessageEmail = buildGlobalAction(this, {
        type: "globalAction",
        functionName: "sendMessageEmail",
        operationName: "sendMessageEmail",
        operationReturnType: "SendMessageEmail",
        namespace: null,
        variables: {
          messageId: { required: false, type: "String" },
          conversationId: { required: false, type: "String" }
        }
      });
      this.sendWidgetMessage = buildGlobalAction(this, {
        type: "globalAction",
        functionName: "sendWidgetMessage",
        operationName: "sendWidgetMessage",
        operationReturnType: "SendWidgetMessage",
        namespace: null,
        variables: {
          conversationId: { required: false, type: "String" },
          content: { required: false, type: "String" },
          shopId: { required: false, type: "String" },
          attachmentBase64: { required: false, type: "String" },
          attachmentFileName: { required: false, type: "String" },
          attachmentMimeType: { required: false, type: "String" }
        }
      });
      this.shopifyPartnerApi = buildGlobalAction(this, {
        type: "globalAction",
        functionName: "shopifyPartnerApi",
        operationName: "shopifyPartnerApi",
        operationReturnType: "ShopifyPartnerApi",
        namespace: null,
        variables: {
          accessToken: { required: false, type: "String" },
          organizationId: { required: false, type: "String" }
        }
      });
      this.testParams = buildGlobalAction(this, {
        type: "globalAction",
        functionName: "testParams",
        operationName: "testParams",
        operationReturnType: "TestParams",
        namespace: null,
        variables: { testString: { required: false, type: "String" } }
      });
      this.trackEvent = buildGlobalAction(this, {
        type: "globalAction",
        functionName: "trackEvent",
        operationName: "trackEvent",
        operationReturnType: "TrackEvent",
        namespace: null,
        variables: {
          event: { required: false, type: "String" },
          distinctId: { required: false, type: "String" },
          sessionId: { required: false, type: "String" },
          timestamp: { required: false, type: "String" }
        }
      });
      this.trackEvents = buildGlobalAction(this, {
        type: "globalAction",
        functionName: "trackEvents",
        operationName: "trackEvents",
        operationReturnType: "TrackEvents",
        namespace: null,
        variables: {
          batch: { required: false, type: "[TrackEventsBatchElementTypeInput!]" }
        }
      });
      this.trackEventsTWO = buildGlobalAction(this, {
        type: "globalAction",
        functionName: "trackEventsTWO",
        operationName: "trackEventsTWO",
        operationReturnType: "TrackEventsTWO",
        namespace: null,
        variables: {
          event: { required: false, type: "String" },
          distinctId: { required: false, type: "String" },
          sessionId: { required: false, type: "String" },
          timestamp: { required: false, type: "String" },
          shopId: { required: false, type: "String" }
        }
      });
      this.view = buildInlineComputedView(this, {
        type: "computedView",
        operationName: "gellyView",
        functionName: "view",
        gqlFieldName: "gellyView",
        namespace: null,
        variables: {
          query: { type: "String", required: true },
          args: { type: "JSONObject" }
        }
      });
      this.apiRoots = { "development": "https://shopappchat--development.gadget.app/", "production": "https://shopappchat.gadget.app/" };
      this.applicationId = "317805";
      this.transaction = async (callback) => {
        return await this.connection.transaction(callback);
      };
      this.getDirectUploadToken = async () => {
        const result = await this.query("query GetDirectUploadToken($nonce: String) { gadgetMeta { directUploadToken(nonce: $nonce) { url, token } } }", { nonce: Math.random().toString(36).slice(2, 7) }, {
          requestPolicy: "network-only"
        });
        return result.gadgetMeta.directUploadToken;
      };
      let inSSRContext = false;
      this.options = options;
      try {
        inSSRContext = !!(__vite_import_meta_env__ && false);
      } catch (error2) {
      }
      if (inSSRContext) {
        const api2 = (_a = globalThis.GadgetGlobals) == null ? void 0 : _a.api;
        if (api2) {
          return api2.actAsSession;
        }
      }
      this.environment = ((options == null ? void 0 : options.environment) ?? getImplicitEnv() ?? fallbackEnv).toLocaleLowerCase();
      let apiRoot;
      if (this.apiRoots[this.environment]) {
        apiRoot = this.apiRoots[this.environment];
      } else {
        const envPart = this.environment == productionEnv ? "" : `--${this.environment}`;
        apiRoot = `https://shopappchat${envPart}.gadget.app`;
      }
      const exchanges = { ...options == null ? void 0 : options.exchanges };
      if (this.environment !== productionEnv) {
        const devHarnessExchange = ({ forward }) => {
          return (operations$) => {
            const operationResult$ = forward(operations$);
            return pipe(
              operationResult$,
              map((result) => {
                try {
                  if (typeof window !== "undefined" && typeof CustomEvent === "function") {
                    const event = new CustomEvent("gadget:devharness:graphqlresult", { detail: result });
                    window.dispatchEvent(event);
                  }
                } catch (error2) {
                  console.warn("[gadget] error dispatching gadget dev harness event", error2);
                }
                return result;
              })
            );
          };
        };
        exchanges.beforeAll = [
          devHarnessExchange,
          ...exchanges.beforeAll ?? []
        ];
      }
      const connectionOptions = {
        endpoint: new URL("api/graphql", apiRoot).toString(),
        applicationId: this.applicationId,
        authenticationMode: options == null ? void 0 : options.authenticationMode,
        ...options,
        exchanges,
        environment: this.environment
      };
      const authenticationMode = maybeGetAuthenticationModeOptionsFromClientOptions(options ?? {});
      connectionOptions.authenticationMode = authenticationMode ?? (typeof window == "undefined" ? { anonymous: true } : { browserSession: true });
      this.connection = new GadgetConnection(connectionOptions);
      if (typeof window != "undefined" && typeof window.document != "undefined" && this.connection.authenticationMode == AuthenticationMode.APIKey && !((_b = options == null ? void 0 : options.authenticationMode) == null ? void 0 : _b.dangerouslyAllowBrowserApiKey)) {
        throw new Error("GGT_BROWSER_API_KEY_USAGE: Using a Gadget API key to authenticate this client object is insecure and will leak your API keys to attackers. Please use a different authentication mode.");
      }
      this.session = new SessionManager(this.connection);
      this.currentSession = new CurrentSessionManager(this.connection);
      this.user = new UserManager(this.connection);
      this.conversation = new ConversationManager(this.connection);
      this.message = new MessageManager(this.connection);
      this.organization = new OrganizationManager(this.connection);
      this.customer = new CustomerManager(this.connection);
      this.testModel = new TestModelManager(this.connection);
      this.analyticsFIVE = new AnalyticsFIVEManager(this.connection);
      this.shop = new ShopManager(this.connection);
      this.internal = {
        session: new InternalModelManager("session", this.connection, { "pluralApiIdentifier": "sessions", "hasAmbiguousIdentifiers": false, "namespace": [] }),
        user: new InternalModelManager("user", this.connection, { "pluralApiIdentifier": "users", "hasAmbiguousIdentifiers": false, "namespace": [] }),
        conversation: new InternalModelManager("conversation", this.connection, { "pluralApiIdentifier": "conversations", "hasAmbiguousIdentifiers": false, "namespace": [] }),
        message: new InternalModelManager("message", this.connection, { "pluralApiIdentifier": "messages", "hasAmbiguousIdentifiers": false, "namespace": [] }),
        organization: new InternalModelManager("organization", this.connection, { "pluralApiIdentifier": "organizations", "hasAmbiguousIdentifiers": false, "namespace": [] }),
        customer: new InternalModelManager("customer", this.connection, { "pluralApiIdentifier": "customers", "hasAmbiguousIdentifiers": false, "namespace": [] }),
        testModel: new InternalModelManager("testModel", this.connection, { "pluralApiIdentifier": "testModels", "hasAmbiguousIdentifiers": false, "namespace": [] }),
        analyticsFIVE: new InternalModelManager("analyticsFIVE", this.connection, { "pluralApiIdentifier": "analyticsFIVEs", "hasAmbiguousIdentifiers": false, "namespace": [] }),
        shop: new InternalModelManager("shop", this.connection, { "pluralApiIdentifier": "shops", "hasAmbiguousIdentifiers": false, "namespace": [] })
      };
    }
    /**
     * Returns a new Client instance that will call the Gadget API as the application's admin user.
     * This can only be used for API clients using internal authentication.
     * @returns {ShopappchatClient} A new ShopappchatClient instance with admin authentication
     */
    get actAsAdmin() {
      var _a, _b, _c;
      assert((_b = (_a = this.options) == null ? void 0 : _a.authenticationMode) == null ? void 0 : _b.internal, `actAsAdmin can only be used for API clients using internal authentication, this client is using ${JSON.stringify((_c = this.options) == null ? void 0 : _c.authenticationMode)}`);
      return new ShopappchatClient({
        ...this.options,
        authenticationMode: {
          internal: {
            ...this.options.authenticationMode.internal,
            actAsSession: false
          }
        }
      });
    }
    /**
     * Returns a new ShopappchatClient instance that will call the Gadget API as with the permission of the current session.
     * This can only be used for API clients using internal authentication.
     * @returns {ShopappchatClient} A new ShopappchatClient instance with session authentication
     */
    get actAsSession() {
      var _a, _b;
      assert((_b = (_a = this.options) == null ? void 0 : _a.authenticationMode) == null ? void 0 : _b.internal, "actAsSession can only be used for API clients using internal authentication");
      return new ShopappchatClient({
        ...this.options,
        authenticationMode: {
          internal: {
            ...this.options.authenticationMode.internal,
            actAsSession: true
          }
        }
      });
    }
    /** Run an arbitrary GraphQL query. */
    async query(graphQL, variables, options) {
      const { data, error: error2 } = await this.connection.currentClient.query(graphQL, variables, options).toPromise();
      if (error2)
        throw error2;
      return data;
    }
    /** Run an arbitrary GraphQL mutation. */
    async mutate(graphQL, variables, options) {
      const { data, error: error2 } = await this.connection.currentClient.mutation(graphQL, variables, options).toPromise();
      if (error2)
        throw error2;
      return data;
    }
    /**
     * `fetch` function that works the same as the built-in `fetch` function, but automatically passes authentication information for this API client.
     *
     * @example
     * await api.fetch("https://myapp--development.gadget.app/foo/bar");
     *
     * @example
     * // fetch a relative URL from the endpoint this API client is configured to fetch from
     * await api.fetch("/foo/bar");
     **/
    async fetch(input, init = {}) {
      return await this.connection.fetch(input, init);
    }
    async enqueue(action, inputOrOptions, maybeOptions) {
      assert(action, ".enqueue must be passed an action as the first argument but was passed undefined");
      let input;
      let options;
      if (typeof maybeOptions !== "undefined") {
        if (typeof inputOrOptions == "string") {
          input = { id: inputOrOptions };
        } else {
          input = inputOrOptions;
        }
        options = maybeOptions;
      } else if (!action.variables || Object.keys(action.variables).length == 0) {
        input = {};
        options = inputOrOptions;
      } else {
        if (typeof inputOrOptions == "string") {
          input = { id: inputOrOptions };
        } else {
          input = inputOrOptions;
        }
        options = {};
      }
      return await enqueueActionRunner(this.connection, action, input, options);
    }
    /**
     * Returns a handle for a given background action id
     *
     * @param action The action that was enqueued
     * @param id The id of the background action
     *
     * @example
     * const handle = api.handle(api.widget.update, "app-job-12346");
     *
     * @example
     * const handle = api.handle(api.someGlobalAction, "app-job-56789");
     **/
    handle(action, id) {
      return new BackgroundActionHandle(this.connection, action, id);
    }
    toString() {
      return `ShopappchatClient<${this.environment}>`;
    }
    toJSON() {
      return this.toString();
    }
  }
  ShopappchatClient.prototype[$modelRelationships] = { "session": { "user": { "type": "BelongsTo", "model": "user" } }, "user": { "messages": { "type": "HasMany", "model": "message" }, "organization": { "type": "BelongsTo", "model": "organization" } }, "conversation": { "messages": { "type": "HasMany", "model": "message" }, "organization": { "type": "BelongsTo", "model": "organization" }, "customer": { "type": "BelongsTo", "model": "customer" } }, "message": { "conversation": { "type": "BelongsTo", "model": "conversation" }, "user": { "type": "BelongsTo", "model": "user" } }, "organization": { "conversations": { "type": "HasMany", "model": "conversation" }, "users": { "type": "HasMany", "model": "user" }, "shops": { "type": "HasMany", "model": "shop" } }, "customer": {}, "testModel": { "user": { "type": "BelongsTo", "model": "user" } }, "analyticsFIVE": { "user": { "type": "BelongsTo", "model": "user" } }, "shop": { "user": { "type": "BelongsTo", "model": "user" }, "parentOrganization": { "type": "BelongsTo", "model": "organization" } } };
  const coreImplementation = {
    GadgetRecord,
    disambiguateActionVariables,
    disambiguateBulkActionVariables,
    capitalizeIdentifier,
    wrapClientSideError: ErrorWrapper.forClientSideError,
    errorIfDataAbsent: ErrorWrapper.errorIfDataAbsent,
    namespaceDataPath,
    camelize,
    isEqual
  };
  ShopappchatClient.prototype[$coreImplementation] = coreImplementation;
  const Client = ShopappchatClient;
  window.shopAnalytics = window.shopAnalytics || { track: () => {
  }, page: () => {
  }, identify: () => {
  }, flush: () => {
  } };
  const getConfig = () => window.SHOPAPPCHAT_CONFIG || {};
  const config = getConfig();
  let api;
  try {
    api = new Client({
      environment: config.environment || "development"
    });
  } catch (err) {
    console.error("[ShopAppChat Analytics] Failed to init client:", err);
  }
  const params = new URLSearchParams(window.location.search);
  let shopDomain = params.get("shop");
  console.log("[ShopAppChat Analytics] Shop from URL:", shopDomain);
  window.addEventListener("message", (e2) => {
    var _a;
    if (((_a = e2.data) == null ? void 0 : _a.type) === "SHOPAPPCHAT_SHOP" && e2.data.shop) {
      console.log("[ShopAppChat Analytics] Received shop from bridge:", e2.data.shop);
      shopDomain = e2.data.shop;
    }
  });
  if (window.parent !== window && !shopDomain) {
    console.log("[ShopAppChat Analytics] Requesting shop from parent");
    window.parent.postMessage({ type: "SHOPAPPCHAT_GET_SHOP" }, "*");
  }
  const getShopDomain = () => shopDomain;
  if (config.orgSlug && api) {
    const getDistinctId = () => {
      const key2 = `osp_distinct_${config.orgSlug}`;
      let id = localStorage.getItem(key2);
      if (!id) {
        id = crypto.randomUUID();
        localStorage.setItem(key2, id);
      }
      return id;
    };
    const getSessionId = () => {
      const key2 = `osp_session_${config.orgSlug}`;
      let id = sessionStorage.getItem(key2);
      if (!id) {
        id = crypto.randomUUID();
        sessionStorage.setItem(key2, id);
      }
      return id;
    };
    let queue = [];
    let flushTimeout = null;
    const flush = async () => {
      if (queue.length === 0) return;
      const events = [...queue];
      queue = [];
      for (const e2 of events) {
        try {
          await api.trackEventsTWO({
            event: e2.event,
            properties: e2.properties,
            distinctId: e2.distinctId,
            sessionId: e2.sessionId,
            timestamp: e2.timestamp,
            shopId: getShopDomain()
          });
        } catch (err) {
          console.warn("Analytics: failed to track event", err);
        }
      }
    };
    const track = (event, properties = {}) => {
      queue.push({
        event,
        properties: {
          ...properties,
          orgSlug: config.orgSlug,
          shopId: config.shopId,
          shopDomain: getShopDomain(),
          $url: window.location.href,
          $referrer: document.referrer
        },
        distinctId: getDistinctId(),
        sessionId: getSessionId(),
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      });
      if (queue.length >= 10) {
        flush();
      } else if (!flushTimeout) {
        flushTimeout = setTimeout(() => {
          flush();
          flushTimeout = null;
        }, 5e3);
      }
    };
    const page = (pageName, properties = {}) => {
      track("$pageview", { pageName, ...properties });
    };
    const identify = (userId, traits = {}) => {
      track("$identify", { userId, ...traits });
    };
    window.addEventListener("beforeunload", flush);
    window.addEventListener("pagehide", flush);
    window.shopAnalytics = { track, page, identify, flush };
    if (config.autoTrackPageviews !== false) {
      page(document.title);
    }
  }
  function patch(params2) {
    const context = {
      left: params2.left,
      delta: params2.delta,
      children: void 0,
      name: void 0,
      nested: false,
      stopped: false
    };
    function process2(context2) {
      var _a;
      const steps = [
        nested_collectChildrenPatchFilter,
        array_collectChildrenPatchFilter,
        trivial_patchFilter,
        nested_patchFilter,
        array_patchFilter
      ];
      for (const step of steps) {
        step(context2);
        if (context2.stopped) {
          context2.stopped = false;
          break;
        }
      }
      if (context2.children) {
        for (const childrenContext of context2.children) {
          process2(childrenContext);
          context2.result = (_a = context2.result) !== null && _a !== void 0 ? _a : context2.left;
          if ("result" in childrenContext === false) {
            delete context2.result[childrenContext.name];
          } else {
            context2.result[childrenContext.name] = childrenContext.result;
          }
        }
      }
    }
    process2(context);
    return context.result;
  }
  function nested_collectChildrenPatchFilter(context) {
    if (!context || !context.children) {
      return;
    }
    if (context.delta._t) {
      return;
    }
    for (let child of context.children) {
      if (Object.prototype.hasOwnProperty.call(context.left, child.name) && child.result === void 0) {
        delete context.left[child.name];
      } else if (context.left[child.name] !== child.result) {
        context.left[child.name] = child.result;
      }
    }
    context.result = context.left;
    context.stopped = true;
  }
  function array_collectChildrenPatchFilter(context) {
    if (!context || !context.children) {
      return;
    }
    if (context.delta._t !== "a") {
      return;
    }
    let length = context.children.length;
    let child;
    for (let index2 = 0; index2 < length; index2++) {
      child = context.children[index2];
      context.left[child.name] = child.result;
    }
    context.result = context.left;
    context.stopped = true;
  }
  function trivial_patchFilter(context) {
    if (typeof context.delta === "undefined") {
      context.result = context.left;
      return;
    }
    context.nested = !Array.isArray(context.delta);
    if (context.nested) {
      return;
    }
    if (context.delta.length === 1) {
      context.result = context.delta[0];
      context.stopped = true;
      return;
    }
    if (context.delta.length === 2) {
      context.result = context.delta[1];
      context.stopped = true;
      return;
    }
    if (context.delta.length === 3 && context.delta[2] === 0) {
      context.stopped = true;
    }
  }
  function nested_patchFilter(context) {
    if (!context.nested) {
      return;
    }
    if (context.delta._t) {
      return;
    }
    for (let name2 in context.delta) {
      if (context.children === void 0) {
        context.children = [];
      }
      context.children.push({
        left: context.left[name2],
        delta: context.delta[name2],
        name: name2,
        stopped: false
      });
    }
    context.stopped = true;
  }
  const ARRAY_MOVE = 3;
  let compare = {
    numerically(a2, b) {
      return a2 - b;
    },
    numericallyBy(name2) {
      return (a2, b) => a2[name2] - b[name2];
    }
  };
  function array_patchFilter(context) {
    if (!context.nested) {
      return;
    }
    if (context.delta._t !== "a") {
      return;
    }
    let index2;
    let index1;
    let delta = context.delta;
    let array = context.left;
    let toRemove = [];
    let toInsert = [];
    let toModify = [];
    for (index2 in delta) {
      if (index2 !== "_t") {
        if (index2[0] === "_") {
          if (delta[index2][2] === 0 || delta[index2][2] === ARRAY_MOVE) {
            toRemove.push(parseInt(index2.slice(1), 10));
          } else {
            throw new Error(`only removal or move can be applied at original array indices, invalid diff type: ${delta[index2][2]}`);
          }
        } else {
          if (delta[index2].length === 1) {
            toInsert.push({
              index: parseInt(index2, 10),
              value: delta[index2][0]
            });
          } else {
            toModify.push({
              index: parseInt(index2, 10),
              delta: delta[index2]
            });
          }
        }
      }
    }
    toRemove = toRemove.sort(compare.numerically);
    for (index2 = toRemove.length - 1; index2 >= 0; index2--) {
      index1 = toRemove[index2];
      let indexDiff = delta[`_${index1}`];
      let removedValue = array.splice(index1, 1)[0];
      if (indexDiff[2] === ARRAY_MOVE) {
        toInsert.push({
          index: indexDiff[1],
          value: removedValue
        });
      }
    }
    toInsert = toInsert.sort(compare.numericallyBy("index"));
    let toInsertLength = toInsert.length;
    for (index2 = 0; index2 < toInsertLength; index2++) {
      let insertion = toInsert[index2];
      array.splice(insertion.index, 0, insertion.value);
    }
    let toModifyLength = toModify.length;
    if (toModifyLength > 0) {
      for (index2 = 0; index2 < toModifyLength; index2++) {
        let modification = toModify[index2];
        if (context.children === void 0) {
          context.children = [];
        }
        context.children.push({
          left: context.left[modification.index],
          delta: modification.delta,
          name: modification.index,
          stopped: false
        });
      }
    }
    if (!context.children) {
      context.result = context.left;
      context.stopped = true;
      return;
    }
  }
  class RepeaterOverflowError extends Error {
    constructor(message) {
      super(message);
      Object.defineProperty(this, "name", {
        value: "RepeaterOverflowError",
        enumerable: false
      });
      if (typeof Object.setPrototypeOf === "function") {
        Object.setPrototypeOf(this, this.constructor.prototype);
      } else {
        this.__proto__ = this.constructor.prototype;
      }
      if (typeof Error.captureStackTrace === "function") {
        Error.captureStackTrace(this, this.constructor);
      }
    }
  }
  function swallow(value2) {
    if (value2 != null && typeof value2.then === "function") {
      value2.then(NOOP, NOOP);
    }
  }
  const Initial = 0;
  const Started = 1;
  const Stopped = 2;
  const Done = 3;
  const Rejected = 4;
  const MAX_QUEUE_LENGTH = 1024;
  const NOOP = () => {
  };
  function consumeExecution(r2) {
    const err = r2.err;
    const execution = Promise.resolve(r2.execution).then((value2) => {
      if (err != null) {
        throw err;
      }
      return value2;
    });
    r2.err = void 0;
    r2.execution = execution.then(
      () => void 0,
      () => void 0
    );
    return r2.pending === void 0 ? execution : r2.pending.then(() => execution);
  }
  function createIteration(r2, value2) {
    const done = r2.state >= Done;
    return Promise.resolve(value2).then((value22) => {
      if (!done && r2.state >= Rejected) {
        return consumeExecution(r2).then((value3) => ({
          value: value3,
          done: true
        }));
      }
      return { value: value22, done };
    });
  }
  function stop(r2, err) {
    if (r2.state >= Stopped) {
      return;
    }
    r2.state = Stopped;
    r2.onnext();
    r2.onstop();
    if (r2.err == null) {
      r2.err = err;
    }
    if (r2.pushes.length === 0 && (typeof r2.buffer === "undefined" || r2.buffer.empty)) {
      finish(r2);
    } else {
      for (const push2 of r2.pushes) {
        push2.resolve();
      }
    }
  }
  function finish(r2) {
    if (r2.state >= Done) {
      return;
    }
    if (r2.state < Stopped) {
      stop(r2);
    }
    r2.state = Done;
    r2.buffer = void 0;
    for (const next of r2.nexts) {
      const execution = r2.pending === void 0 ? consumeExecution(r2) : r2.pending.then(() => consumeExecution(r2));
      next.resolve(createIteration(r2, execution));
    }
    r2.pushes = [];
    r2.nexts = [];
  }
  function reject(r2) {
    if (r2.state >= Rejected) {
      return;
    }
    if (r2.state < Done) {
      finish(r2);
    }
    r2.state = Rejected;
  }
  function push(r2, value2) {
    swallow(value2);
    if (r2.pushes.length >= MAX_QUEUE_LENGTH) {
      throw new RepeaterOverflowError(`No more than ${MAX_QUEUE_LENGTH} pending calls to push are allowed on a single repeater.`);
    } else if (r2.state >= Stopped) {
      return Promise.resolve(void 0);
    }
    let valueP = r2.pending === void 0 ? Promise.resolve(value2) : r2.pending.then(() => value2);
    valueP = valueP.catch((err) => {
      if (r2.state < Stopped) {
        r2.err = err;
      }
      reject(r2);
      return void 0;
    });
    let nextP;
    if (r2.nexts.length) {
      const next2 = r2.nexts.shift();
      next2.resolve(createIteration(r2, valueP));
      if (r2.nexts.length) {
        nextP = Promise.resolve(r2.nexts[0].value);
      } else {
        nextP = new Promise((resolve) => r2.onnext = resolve);
      }
    } else if (typeof r2.buffer !== "undefined" && !r2.buffer.full) {
      r2.buffer.add(valueP);
      nextP = Promise.resolve(void 0);
    } else {
      nextP = new Promise((resolve) => r2.pushes.push({ resolve, value: valueP }));
    }
    let floating = true;
    const next = {};
    const unhandled = nextP.catch((err) => {
      if (floating) {
        throw err;
      }
      return void 0;
    });
    next.then = (onfulfilled, onrejected) => {
      floating = false;
      return Promise.prototype.then.call(nextP, onfulfilled, onrejected);
    };
    next.catch = (onrejected) => {
      floating = false;
      return Promise.prototype.catch.call(nextP, onrejected);
    };
    next.finally = nextP.finally.bind(nextP);
    r2.pending = valueP.then(() => unhandled).catch((err) => {
      r2.err = err;
      reject(r2);
    });
    return next;
  }
  function createStop(r2) {
    const stop1 = stop.bind(null, r2);
    const stopP = new Promise((resolve) => r2.onstop = resolve);
    stop1.then = stopP.then.bind(stopP);
    stop1.catch = stopP.catch.bind(stopP);
    stop1.finally = stopP.finally.bind(stopP);
    return stop1;
  }
  function execute(r2) {
    if (r2.state >= Started) {
      return;
    }
    r2.state = Started;
    const push1 = push.bind(null, r2);
    const stop1 = createStop(r2);
    r2.execution = new Promise((resolve) => resolve(r2.executor(push1, stop1)));
    r2.execution.catch(() => stop(r2));
  }
  const records = /* @__PURE__ */ new WeakMap();
  class Repeater {
    constructor(executor, buffer) {
      records.set(this, {
        executor,
        buffer,
        err: void 0,
        state: Initial,
        pushes: [],
        nexts: [],
        pending: void 0,
        execution: void 0,
        onnext: NOOP,
        onstop: NOOP
      });
    }
    next(value2) {
      swallow(value2);
      const r2 = records.get(this);
      if (r2 === void 0) {
        throw new Error("WeakMap error");
      }
      if (r2.nexts.length >= MAX_QUEUE_LENGTH) {
        throw new RepeaterOverflowError(`No more than ${MAX_QUEUE_LENGTH} pending calls to next are allowed on a single repeater.`);
      }
      if (r2.state <= Initial) {
        execute(r2);
      }
      r2.onnext(value2);
      if (typeof r2.buffer !== "undefined" && !r2.buffer.empty) {
        const result = createIteration(r2, r2.buffer.remove());
        if (r2.pushes.length) {
          const push2 = r2.pushes.shift();
          r2.buffer.add(push2.value);
          r2.onnext = push2.resolve;
        }
        return result;
      } else if (r2.pushes.length) {
        const push2 = r2.pushes.shift();
        r2.onnext = push2.resolve;
        return createIteration(r2, push2.value);
      } else if (r2.state >= Stopped) {
        finish(r2);
        return createIteration(r2, consumeExecution(r2));
      }
      return new Promise((resolve) => r2.nexts.push({ resolve, value: value2 }));
    }
    return(value2) {
      swallow(value2);
      const r2 = records.get(this);
      if (r2 === void 0) {
        throw new Error("WeakMap error");
      }
      finish(r2);
      r2.execution = Promise.resolve(r2.execution).then(() => value2);
      return createIteration(r2, consumeExecution(r2));
    }
    throw(err) {
      const r2 = records.get(this);
      if (r2 === void 0) {
        throw new Error("WeakMap error");
      }
      if (r2.state <= Initial || r2.state >= Stopped || typeof r2.buffer !== "undefined" && !r2.buffer.empty) {
        finish(r2);
        if (r2.err == null) {
          r2.err = err;
        }
        return createIteration(r2, consumeExecution(r2));
      }
      return this.next(Promise.reject(err));
    }
  }
  Repeater.prototype[Symbol.asyncIterator] = function() {
    return this;
  };
  const createApplyLiveQueryPatch = (applyPatch) => (source) => new Repeater(async (push2, stop2) => {
    const iterator = source[Symbol.asyncIterator]();
    stop2.then(() => {
      var _a;
      return (_a = iterator.return) == null ? void 0 : _a.call(iterator);
    }).catch(console.log);
    let mutableData = null;
    let lastRevision = 0;
    let next;
    while ((next = await iterator.next()).done === false) {
      if ("revision" in next.value && next.value.revision) {
        const valueToPublish = {};
        if (next.value.revision === 1) {
          if (next.value.data !== void 0) {
            valueToPublish.data = next.value.data;
            mutableData = next.value.data;
            lastRevision = 1;
          } else {
            throw new Error("Missing data.");
          }
        } else {
          if (!mutableData) {
            throw new Error("No previousData available.");
          }
          if (!next.value.patch) {
            throw new Error("Missing patch.");
          }
          if (lastRevision + 1 !== next.value.revision) {
            throw new Error("Wrong revision received.");
          }
          mutableData = applyPatch(mutableData, next.value.patch);
          valueToPublish.data = { ...mutableData };
          lastRevision++;
        }
        if (next.value.extensions) {
          valueToPublish.extensions = next.value.extensions;
        }
        if (next.value.errors) {
          valueToPublish.errors = next.value.errors;
        }
        await push2(valueToPublish);
        continue;
      }
      await push2(next.value);
    }
    stop2();
  });
  function withHandlers(source, onReturn, onThrow) {
    const stream = async function* withReturnSource() {
      yield* source;
    }();
    const originalReturn = stream.return.bind(stream);
    if (onReturn) {
      stream.return = (...args) => {
        onReturn();
        return originalReturn(...args);
      };
    }
    if (onThrow) {
      const originalThrow = stream.throw.bind(stream);
      stream.throw = (err) => {
        onThrow(err);
        return originalThrow(err);
      };
    }
    return stream;
  }
  function createDeferred() {
    const d2 = {};
    d2.promise = new Promise((resolve, reject2) => {
      d2.resolve = resolve;
      d2.reject = reject2;
    });
    return d2;
  }
  function makePushPullAsyncIterableIterator() {
    let state = {
      type: "running"
      /* running */
    };
    let next = createDeferred();
    const values = [];
    function pushValue(value2) {
      if (state.type !== "running") {
        return;
      }
      values.push(value2);
      next.resolve();
      next = createDeferred();
    }
    const source = async function* PushPullAsyncIterableIterator() {
      while (true) {
        if (values.length > 0) {
          yield values.shift();
        } else {
          if (state.type === "error") {
            throw state.error;
          }
          if (state.type === "finished") {
            return;
          }
          await next.promise;
        }
      }
    }();
    const stream = withHandlers(source, () => {
      if (state.type !== "running") {
        return;
      }
      state = {
        type: "finished"
        /* finished */
      };
      next.resolve();
    }, (error2) => {
      if (state.type !== "running") {
        return;
      }
      state = {
        type: "error",
        error: error2
      };
      next.resolve();
    });
    return {
      pushValue,
      asyncIterableIterator: stream
    };
  }
  const makeAsyncIterableIteratorFromSink = (make2) => {
    const { pushValue, asyncIterableIterator } = makePushPullAsyncIterableIterator();
    const dispose = make2({
      next: (value2) => {
        pushValue(value2);
      },
      complete: () => {
        asyncIterableIterator.return();
      },
      error: (err) => {
        asyncIterableIterator.throw(err);
      }
    });
    const originalReturn = asyncIterableIterator.return;
    let returnValue = void 0;
    asyncIterableIterator.return = () => {
      if (returnValue === void 0) {
        dispose();
        returnValue = originalReturn();
      }
      return returnValue;
    };
    return asyncIterableIterator;
  };
  function applyAsyncIterableIteratorToSink(asyncIterableIterator, sink) {
    const run = async () => {
      try {
        for await (const value2 of asyncIterableIterator) {
          sink.next(value2);
        }
        sink.complete();
      } catch (err) {
        sink.error(err);
      }
    };
    run();
    return () => {
      var _a;
      (_a = asyncIterableIterator.return) === null || _a === void 0 ? void 0 : _a.call(asyncIterableIterator);
    };
  }
  const applyJSONDiffPatch = (left, delta) => patch({
    left,
    delta
  });
  const applyLiveQueryJSONDiffPatch = createApplyLiveQueryPatch(applyJSONDiffPatch);
  const index = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    applyAsyncIterableIteratorToSink,
    applyJSONDiffPatch,
    applyLiveQueryJSONDiffPatch,
    makeAsyncIterableIteratorFromSink
  }, Symbol.toStringTag, { value: "Module" }));
})();
