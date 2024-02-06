    The supplied tag ‘${a}’ contains a variant (‘${u}’) that is present more than once.

    Please provide variants only once.
  `,emptyTag:`
    The supplied tag was empty. Please supply an IETF language tag!
  `,invalidExtension:(a,u,g)=>`
    The supplied tag ‘${a}’ contains a singleton (the ‘${u[0]}’ in ‘${u}’ and
    ‘${u[0]}-${g}’) that is present more than once.

    The tag cannot have ‘${u}’ and ‘${u[0]}-${g}’ at the same time.

    Please supply only one value for the ‘${u[0]}-...’ extension.
  `,invalidTag:a=>`
    Could not interpret ‘${a}’ - Please supply a valid IETF/BCP-47 language tag!

    If necessary, you can find out more on https://tools.ietf.org/html/rfc5646.
  `,underscoresFound:a=>`
    ‘${a}’ is not a valid IETF language tag.

    It contains underscores, indicating that it is a POSIX locale [1] or Unicode language tag [2].

    Despite looking similar, both standards work differently than what the
    @sozialhelden/ietf-language-tags module supports.

    - If you generated the tag yourself, please ensure you use minus signs (e.g. ‘de-DE’), not
      underscores, for separating the subtags.
    - If you got the value from an API or library, please try to find a replacement that outputs
      real IETF/BCP-47 language tags, or convert the value yourself. Note that conversion is more
      complicated than just replacing '_' with '-'! For Unicode language tags, the standard [2]
      describes how to convert them to the IETF/BCP-47 format.
    - If you actually wanted to work with POSIX locales, this library is probably not the right
      one, it only supports IETF language tags.
    - If you actually wanted to work with Unicode language tags, you can convert them by replacing
      the underscores with hyphens. However, this library won't help you with parsing the Unicode
      standard’s extensions - if you need to interpret them, you need additional code for this. It
      might be a better idea to have a look at cldrjs [3] in your case.

    Sorry for the inconvenience!

    [1] POSIX locales / ISO 15897 / https://www.iso.org/standard/50707.html
    [2] http://unicode.org/reports/tr35/#Unicode_Language_and_Locale_Identifiers.
    [3] https://github.com/rxaviers/cldrjs
  `};var C={};Object.defineProperty(C,"__esModule",{value:!0});function Sa(a){const u=a.split(/-/);return u.map((g,r)=>{if(r!==0&&u[r-1].length!==1){if(g.length===2)return g.toUpperCase();if(g.length===4)return`${g[0].toUpperCase()}${g.slice(1).toLowerCase()}`}return g.toLowerCase()}).join("-")}C.default=Sa;var x={};Object.defineProperty(x,"__esModule",{value:!0});x.rfc5646RegExp=void 0;const D=f;function k(a){return`(?:${Object.keys(a).map(g=>g.replace(/\./g,"\\.")).join("|")})`}function ea(a=!1){const u=k(D.default.grandfathered),g=`(?<extlang>${a?k(D.default.extlang):"(?:[a-z]{3}(?:-[a-z]{3}){0,2})"})`,r=a?k(D.default.script):"[a-z]{4}",e=a?k(D.default.region):"(?:[a-z]{2}|[0-9]{3})",n=a?k(D.default.variant):"(?:[a-z0-9]{5,8}|[0-9][a-z0-9]{3})",d="[0-9a-wy-z](?:-[a-z0-9]{2,8})+",i="x(?:-[a-z0-9]{1,8})+",s=`^(?:(?<langtag>${`
    (?<language>${a?k(D.default.language):`(?:[a-z]{2,3}(?:-${g})?|[a-z]{4}|[a-z]{5,8})`})
    (-(?<script>${r}))?
    (-(?<region>${e}))?
    (?<variants>(?:-${n})*)
    (?<extensions>(?:-${d})*)
    (?:-(?<privateuse>(?:${i})))?
  `})|(?<privateuse2>${i})|(?<grandfathered>${u}))$`.replace(/[\s\t\n]/g,"");return new RegExp(s,"i")}x.default=ea;x.rfc5646RegExp=ea();Object.defineProperty(v,"__esModule",{value:!0});const m=z,Ta=C,ma=x;function Aa(a,u=!1,g=console.log){if(a.match(/_/)){(0,m.default)(m.errorMessages.underscoresFound(a),u,g);return}if(a===""){(0,m.default)(m.errorMessages.emptyTag,u,g);return}const r=(0,Ta.default)(a),e=r.match(ma.rfc5646RegExp);if(!e||!e.groups){(0,m.default)(m.errorMessages.invalidTag(a),u,g);return}const{groups:n}=e,t={};let d=!0;if(n.extensions){const p=n.extensions.toLowerCase().match(/(?:[0-9a-wy-z](?:-[a-z0-9]{2,8})+)/g);Array.from(p||[]).forEach(s=>{const b=t[s[0]];b&&((0,m.default)(m.errorMessages.invalidExtension(r,s,b),u,g),d=!1),t[s[0]]=s.slice(2)})}if(!d)return;const i=n.variants?n.variants.split(/-/).filter(p=>p!==""):void 0,l=new Set(i);if(i&&i.length!==l.size){const p=Array.from(l).find(s=>i.filter(b=>b===s).length>1);if(p){(0,m.default)(m.errorMessages.duplicateVariant(r,p),u,g);return}}const o={variants:i,extensions:n.extensions?t:void 0,extlang:n.extlang,grandfathered:n.grandfathered,langtag:n.langtag,language:n.language,privateuse:n.privateuse||n.privateuse2,region:n.region,script:n.script};return Object.keys(o).forEach(p=>{const s=o[p];(typeof s>"u"||s==="")&&delete o[p]}),o}v.default=Aa;Object.defineProperty(h,"__esModule",{value:!0});h.expandTag=void 0;const $=M,Da=v,ka=["language","extlang","grandfathered","redundant","region","script","variants","collection","macrolanguage","privateuse","special"];function ga(a){const u={parts:a};return ka.forEach(g=>{const r=a[g];if(!r||g==="parts")return;if(g==="langtag"||g==="extensions"||g==="privateuse"||g==="special"){u[g]=r;return}if(g==="variants"){u.variants=r.map(n=>(0,$.default)("variant",n));return}const e=(0,$.default)(g,r);e&&(u[g]=e)}),u}h.expandTag=ga;function ha(a,u=!1){const g=(0,Da.default)(a,u);if(g)return ga(g)}h.default=ha;Object.defineProperty(P,"__esModule",{value:!0});const fa=da,wa=h,xa=v;function N(a,u,g){return g[0]==="Private use"?[`private use ${a} ‘${u.parts[a]}’`]:g}function va(a){var i,l,o,p,s,b,T,y,c;const u=(0,xa.default)(a,!0,null);if(!u)return`Invalid tag ‘${a}’`;const g=(0,wa.expandTag)(u),r=g&&g.language&&g.language.Description&&g.language.Description[0],e=g.variants&&g.variants.map(S=>{var A;return(((A=S==null?void 0:S.Description)==null?void 0:A[0])||`‘${S}’ variant`).replace(/^The /,"").replace(r||"","").replace(/^, /,"")}).join(" or "),n=g.variants?`${e}${e&&e.match(/dialect$/)?"":" variant"} of `:"",t=g.privateuse?`private extension ‘${g.privateuse}’`:"";let d=(n+(0,fa.default)([g.grandfathered&&`${g.grandfathered.Description} (grandfathered tag)`,(l=(i=g.extlang)==null?void 0:i.Description)==null?void 0:l.join(" / "),(o=g.macrolanguage)==null?void 0:o.Description,(p=g.collection)==null?void 0:p.Description,((s=g.language)==null?void 0:s.Description)&&N("language",g,g.language.Description).join(" / "),((b=g.script)==null?void 0:b.Description)&&`written in ${N("script",g,g.script.Description).join("/")} script`,((T=g.region)==null?void 0:T.Description)&&`as used in ${N("region",g,g.region.Description)}`,(y=g.redundant)==null?void 0:y.Description,(c=g.special)==null?void 0:c.Description,g.extensions&&`Extensions: ${g.extensions}`]).join(", ")).replace(/\s+/g," ");return t&&(d?d+=` (with ${t})`:d+=t),d.length>0?d:"(undefined tag)"}P.default=va;var J={};Object.defineProperty(J,"__esModule",{value:!0});const j=f;function za(a){const u=j.default.language[a],g=j.default.registry[u].Macrolanguage,r=typeof g<"u"&&j.default.macrolanguage[g];return r?j.default.registry[r]:void 0}J.default=za;var Q={};Object.defineProperty(Q,"__esModule",{value:!0});const L=f;function _a(a){const u=L.default.index[a.toLowerCase()];if(u){if(u.grandfathered)return L.default.registry[u.grandfathered]["Preferred-Value"];if(u.redundant)return L.default.registry[u.redundant]["Preferred-Value"]}}Q.default=_a;var na={};Object.defineProperty(na,"__esModule",{value:!0});(function(a){var u=_&&_.__createBinding||(Object.create?function(b,T,y,c){c===void 0&&(c=y);var S=Object.getOwnPropertyDescriptor(T,y);(!S||("get"in S?!T.__esModule:S.writable||S.configurable))&&(S={enumerable:!0,get:function(){return T[y]}}),Object.defineProperty(b,c,S)}:function(b,T,y,c){c===void 0&&(c=y),b[c]=T[y]}),g=_&&_.__exportStar||function(b,T){for(var y in b)y!=="default"&&!Object.prototype.hasOwnProperty.call(T,y)&&u(T,b,y)};Object.defineProperty(a,"__esModule",{value:!0}),a.createRFC5646Regexp=a.normalizeLanguageTagCasing=a.indexes=a.getSubTag=a.getTag=a.getPreferredLanguageTag=a.getMacroLanguage=a.parseLanguageTag=a.generateAlphabeticRange=a.describeIETFLanguageTag=void 0;var r=P;Object.defineProperty(a,"describeIETFLanguageTag",{enumerable:!0,get:function(){return r.default}});var e=w;Object.defineProperty(a,"generateAlphabeticRange",{enumerable:!0,get:function(){return e.default}});var n=v;Object.defineProperty(a,"parseLanguageTag",{enumerable:!0,get:function(){return n.default}});var t=J;Object.defineProperty(a,"getMacroLanguage",{enumerable:!0,get:function(){return t.default}});var d=Q;Object.defineProperty(a,"getPreferredLanguageTag",{enumerable:!0,get:function(){return d.default}});var i=h;Object.defineProperty(a,"getTag",{enumerable:!0,get:function(){return i.default}});var l=M;Object.defineProperty(a,"getSubTag",{enumerable:!0,get:function(){return l.default}});var o=f;Object.defineProperty(a,"indexes",{enumerable:!0,get:function(){return o.default}});var p=C;Object.defineProperty(a,"normalizeLanguageTagCasing",{enumerable:!0,get:function(){return p.default}});var s=x;Object.defineProperty(a,"createRFC5646Regexp",{enumerable:!0,get:function(){return s.default}}),g(na,a)})(sa);export{Ca as a,sa as c};
//# sourceMappingURL=language-db-1_EOfXBU.js.map