"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[859],{5058:function(e,n,t){t.r(n),t.d(n,{frontMatter:function(){return r},contentTitle:function(){return c},metadata:function(){return d},toc:function(){return u},Highlight:function(){return A},default:function(){return g}});var a=t(7462),o=t(3366),i=(t(7294),t(3905)),s=["components"],r={sidebar_position:4},c="Markdown Features",d={unversionedId:"tutorial-basics/markdown-features",id:"tutorial-basics/markdown-features",isDocsHomePage:!1,title:"Markdown Features",description:"Docusaurus supports Markdown and a few additional features.",source:"@site/docs/tutorial-basics/markdown-features.mdx",sourceDirName:"tutorial-basics",slug:"/tutorial-basics/markdown-features",permalink:"/centrifuga4/docs/tutorial-basics/markdown-features",editUrl:"https://github.com/miquelvir/centrifuga4/edit/master/website/docs/tutorial-basics/markdown-features.mdx",version:"current",sidebarPosition:4,frontMatter:{sidebar_position:4},sidebar:"tutorialSidebar",previous:{title:"Create a Blog Post",permalink:"/centrifuga4/docs/tutorial-basics/create-a-blog-post"},next:{title:"Deploy your site",permalink:"/centrifuga4/docs/tutorial-basics/deploy-your-site"}},u=[{value:"Front Matter",id:"front-matter",children:[]},{value:"Links",id:"links",children:[]},{value:"Images",id:"images",children:[]},{value:"Code Blocks",id:"code-blocks",children:[]},{value:"Admonitions",id:"admonitions",children:[]},{value:"MDX and React Components",id:"mdx-and-react-components",children:[]}],A=function(e){var n=e.children,t=e.color;return(0,i.kt)("span",{style:{backgroundColor:t,borderRadius:"20px",color:"#fff",padding:"10px",cursor:"pointer"},onClick:function(){alert("You clicked the color "+t+" with label "+n)}},n)},l={toc:u,Highlight:A};function g(e){var n=e.components,r=(0,o.Z)(e,s);return(0,i.kt)("wrapper",(0,a.Z)({},l,r,{components:n,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"markdown-features"},"Markdown Features"),(0,i.kt)("p",null,"Docusaurus supports ",(0,i.kt)("strong",{parentName:"p"},(0,i.kt)("a",{parentName:"strong",href:"https://daringfireball.net/projects/markdown/syntax"},"Markdown"))," and a few ",(0,i.kt)("strong",{parentName:"p"},"additional features"),"."),(0,i.kt)("h2",{id:"front-matter"},"Front Matter"),(0,i.kt)("p",null,"Markdown documents have metadata at the top called ",(0,i.kt)("a",{parentName:"p",href:"https://jekyllrb.com/docs/front-matter/"},"Front Matter"),":"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-text",metastring:'title="my-doc.md"',title:'"my-doc.md"'},"// highlight-start\n---\nid: my-doc-id\ntitle: My document title\ndescription: My document description\nslug: /my-custom-url\n---\n// highlight-end\n\n## Markdown heading\n\nMarkdown text with [links](./hello.md)\n")),(0,i.kt)("h2",{id:"links"},"Links"),(0,i.kt)("p",null,"Regular Markdown links are supported, using url paths or relative file paths."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-md"},"Let's see how to [Create a page](/create-a-page).\n")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-md"},"Let's see how to [Create a page](./create-a-page.md).\n")),(0,i.kt)("p",null,(0,i.kt)("strong",{parentName:"p"},"Result:")," Let's see how to ",(0,i.kt)("a",{parentName:"p",href:"/centrifuga4/docs/tutorial-basics/create-a-page"},"Create a page"),"."),(0,i.kt)("h2",{id:"images"},"Images"),(0,i.kt)("p",null,"Regular Markdown images are supported."),(0,i.kt)("p",null,"Add an image at ",(0,i.kt)("inlineCode",{parentName:"p"},"static/img/favicon.png")," and display it in Markdown:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-md"},"![Docusaurus logo](/img/favicon.png)\n")),(0,i.kt)("p",null,(0,i.kt)("img",{alt:"Docusaurus logo",src:t(4108).Z})),(0,i.kt)("h2",{id:"code-blocks"},"Code Blocks"),(0,i.kt)("p",null,"Markdown code blocks are supported with Syntax highlighting."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},'```jsx title="src/components/HelloDocusaurus.js"\nfunction HelloDocusaurus() {\n    return (\n        <h1>Hello, Docusaurus!</h1>\n    )\n}\n```\n')),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-jsx",metastring:'title="src/components/HelloDocusaurus.js"',title:'"src/components/HelloDocusaurus.js"'},"function HelloDocusaurus() {\n  return <h1>Hello, Docusaurus!</h1>;\n}\n")),(0,i.kt)("h2",{id:"admonitions"},"Admonitions"),(0,i.kt)("p",null,"Docusaurus has a special syntax to create admonitions and callouts:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},":::tip My tip\n\nUse this awesome feature option\n\n:::\n\n:::danger Take care\n\nThis action is dangerous\n\n:::\n")),(0,i.kt)("div",{className:"admonition admonition-tip alert alert--success"},(0,i.kt)("div",{parentName:"div",className:"admonition-heading"},(0,i.kt)("h5",{parentName:"div"},(0,i.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,i.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"12",height:"16",viewBox:"0 0 12 16"},(0,i.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.5 0C3.48 0 1 2.19 1 5c0 .92.55 2.25 1 3 1.34 2.25 1.78 2.78 2 4v1h5v-1c.22-1.22.66-1.75 2-4 .45-.75 1-2.08 1-3 0-2.81-2.48-5-5.5-5zm3.64 7.48c-.25.44-.47.8-.67 1.11-.86 1.41-1.25 2.06-1.45 3.23-.02.05-.02.11-.02.17H5c0-.06 0-.13-.02-.17-.2-1.17-.59-1.83-1.45-3.23-.2-.31-.42-.67-.67-1.11C2.44 6.78 2 5.65 2 5c0-2.2 2.02-4 4.5-4 1.22 0 2.36.42 3.22 1.19C10.55 2.94 11 3.94 11 5c0 .66-.44 1.78-.86 2.48zM4 14h5c-.23 1.14-1.3 2-2.5 2s-2.27-.86-2.5-2z"}))),"My tip")),(0,i.kt)("div",{parentName:"div",className:"admonition-content"},(0,i.kt)("p",{parentName:"div"},"Use this awesome feature option"))),(0,i.kt)("div",{className:"admonition admonition-danger alert alert--danger"},(0,i.kt)("div",{parentName:"div",className:"admonition-heading"},(0,i.kt)("h5",{parentName:"div"},(0,i.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,i.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"12",height:"16",viewBox:"0 0 12 16"},(0,i.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M5.05.31c.81 2.17.41 3.38-.52 4.31C3.55 5.67 1.98 6.45.9 7.98c-1.45 2.05-1.7 6.53 3.53 7.7-2.2-1.16-2.67-4.52-.3-6.61-.61 2.03.53 3.33 1.94 2.86 1.39-.47 2.3.53 2.27 1.67-.02.78-.31 1.44-1.13 1.81 3.42-.59 4.78-3.42 4.78-5.56 0-2.84-2.53-3.22-1.25-5.61-1.52.13-2.03 1.13-1.89 2.75.09 1.08-1.02 1.8-1.86 1.33-.67-.41-.66-1.19-.06-1.78C8.18 5.31 8.68 2.45 5.05.32L5.03.3l.02.01z"}))),"Take care")),(0,i.kt)("div",{parentName:"div",className:"admonition-content"},(0,i.kt)("p",{parentName:"div"},"This action is dangerous"))),(0,i.kt)("h2",{id:"mdx-and-react-components"},"MDX and React Components"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://mdxjs.com/"},"MDX")," can make your documentation more ",(0,i.kt)("strong",{parentName:"p"},"interactive")," and allows using any ",(0,i.kt)("strong",{parentName:"p"},"React components inside Markdown"),":"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-jsx"},"export const Highlight = ({children, color}) => (\n  <span\n    style={{\n      backgroundColor: color,\n      borderRadius: '20px',\n      color: '#fff',\n      padding: '10px',\n      cursor: 'pointer',\n    }}\n    onClick={() => {\n      alert(`You clicked the color ${color} with label ${children}`)\n    }}>\n    {children}\n  </span>\n);\n\nThis is <Highlight color=\"#25c2a0\">Docusaurus green</Highlight> !\n\nThis is <Highlight color=\"#1877F2\">Facebook blue</Highlight> !\n")),(0,i.kt)("p",null,"This is ",(0,i.kt)(A,{color:"#25c2a0",mdxType:"Highlight"},"Docusaurus green")," !"),(0,i.kt)("p",null,"This is ",(0,i.kt)(A,{color:"#1877F2",mdxType:"Highlight"},"Facebook blue")," !"))}g.isMDXComponent=!0},4108:function(e,n){n.Z="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAW8AAAFvCAYAAACFPEoUAAAACXBIWXMAACxKAAAsSgF3enRNAAAPYElEQVR4nO3dPW4cRxqA4RJDR4YvoMSRIu0RfAMv4FiQTrBrOPMBlBmLPYEJxwZ8BF9BESMH6wsYjhRaC1IseUjOT/9UdddX9TyZRM1Mdw3wqtDsrkpwzoebq88/3Fx9bZC28/7t85fv3z435px1ZXg45TbcKaVfU0q/fLi5em2g6rsNdx7z92+fG3NOemZoOOYg3C8Pfvzm2Yu/rg1YHQfh/vzgA9589v3vxpwnxJsnToQ7E/AKToQ7E3CeEG8euBDuTMALuhDuTMB5QLz5ZGK4MwEvYGK4MwHnE/HmzsxwZwK+wsxwZwLOHfFmabgzAV9gYbgzAUe8R7cy3JmAz7Ay3JmAD068B1Yo3JmAT1Ao3JmAD0y8B1U43JmAn1E43JmAD0q8B1Qp3JmAH1Ep3JmAD0i8B1M53JmAH6gc7kzAByPeA9ko3JmAbxfuTMAHIt6D2Djc2dAB3zjcmYAPQrwHsFO4s+tnL/56M9qY7xTuTMAHIN6d2znc2VAB3zncmYB3Trw71ki4syEC3ki4MwHvmHh3qrFwZ10HvLFwZwLeKfHuUKPhzroMeKPhzgS8Q+LdmcbDnXUV8MbDnQl4Z8S7I0HCnXUR8CDhzgS8I+LdiWDhzkIHPFi4MwHvhHh3IGi4s5ABDxruTMA7IN7BBQ93FirgwcOdCXhw4h1YJ+HOQgS8k3BnAh7Y1egDEFVn4b71+sPN1esGjuOSXsJ968f3b59HGHOOEO+AOgx3up95R5gFftvAMZQk4EG5bBJMx+GOdM37NnY/NnAoJbmEEox4ByLc7RBw9ibeQQh3ewScPYl3AMLdLgFnL+LdOOFun4CzB/FumHDHIeBsTbwbJdzxCDhbEu8GCXdcAs5WxLsxwh2fgLMF8W6IcPdDwKlNvBsh3P0RcGoS7wYId78EnFrEe2fC3T8Bpwbx3pFwj0PAKU28dyLc4xFwShLvHQj3uAScUsR7Y8KNgFOCeG9IuMkEnLXEeyPCzWMCzhrivQHh5hQBZynxrky4uUTAWUK8KxJuphJw5hLvSoSbuQScOcS7AuFmKQFnKvEuTLhZS8CZQrwLEm5KEXAuEe9ChJvSBJxzxLsA4aYWAecU8V5JuKlNwDlGvFcQbrYi4Dwm3gsJN1sTcA6J9wLCzV4EnEy8ZxJu9ibgJPGeR7hphYAj3hMJN60R8LGJ9wTCTasEfFzifYFw0zoBH5N4nyHcRCHg4xHvE4SbaAR8LOJ9hHATlYCPQ7wfEW6iE/AxiPcB4aYXAt4/8b4n3PRGwPsm3sJNxwS8X8PHW7jpnYD3aeh4CzejEPD+DBtv4WY0At6XIeMt3IxKwPsxXLyFm9EJeB+Girdww0cCHt8w8RZueEjAYxsi3sINxwl4XN3HW7jhPAGPqet4CzdMI+DxdBtv4YZ5BDyWLuMt3LCMgMfRXbyFG9YR8Bi6irdwQxkC3r5u4i3cUJaAt62LeAs31CHg7Qofb+GGugS8TaHjLdywDQFvT9h4CzdsS8DbEjLewg37EPB2hIu3cMO+BLwNoeIt3NAGAd9fmHgLN7RFwPcVIt7CDW0S8P00H2/hhrYJ+D6ajrdwQwwCvr1m4y3cEIuAb6vJeAs3xCTg22ku3sINsQn4NpqKt3BDHzoM+J8ppa8++/73dw0cy51m4i3c0BcBr6uJeAs39EnA69k93sINfRPwOnaNt3DDGAS8vN3iLdwwFgEva5d4CzeMScDL2Tzewg1jE/AyNo23cANJwIvYLN7CDRwS8HU2ibdwA8cI+HLV4y3cwDkCvkzVeAs3MIWAz1ct3sINzCHg81SJt3ADSwj4dMXjLdzAGgI+TdF4CzdQgoBfVizewg2UJODnFYm3cAM1CPhpq+Mt3EBNAn7cqngLN7AFAX9qcbyFG9iSgD+0KN7CDexBwP82O97CDexJwD+aFW/hBlog4DPiLdxAS0YP+KR4CzfQopEDfjHewg20bNSAn423cAMRjBjwk/EWbiCS0QJ+NN7CDUQ0UsCfxFu4gchGCfiDeAs30IMRAv4p3sIN9KT3gN/FW7iBHvUc8GfCDfSs14BfpZT+LdxArz77/vfrlFJPTbidcP+SL5vc/q/0ev9jWk24gaM6moHfzbwPf2EZPeDCDZzVQcD/vuZ9+LeBAy7cwCSBA/70bpNDAQMu3MAsAQN++j7vQ4ECLtzAIoECfvkJy0MBAi7cwCoBAj59bZNDDQdcuIEiGg74/FUFDzUYcOEGimow4MvX8z7UUMCFG6iioYCv30nnUAMBF26gqgYCPnkPy6up73gfzuvVh7aMcAPV7fwo/f+K7x5/aIcZuHADm9phBv7uPtx/Tn3B7HinbQMu3MAuNgz47HCnpfFO2wRcuIFdbRDwReFOa+Kd6gZcuIEmVAz44nCntfFOdQIu3EBTKgR8VbhTiXinsgEXbqBJBQO+OtypVLxTmYALN9C0AgEvEu5UMt5pXcCFGwhhRcCLhTuVjndaFnDhBkJZEPCi4U414p3mBVy4gZBmBLx4uFOteKdpARduILQJAa8S7lQz3ul8wIUb6MKZgFcLd6od73Q84MINdOVIwKuGO20R7/Qw4MINdOkg4NXDvakPN1eRdqQHmO392+dfv3/7/HMjBwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAATPFsi1H648WXL1NKv6SU/vnFzW/vfDNAb3745qfPU0q/ppT++93Pr65rn171eN+H+/aEbk/sz5TSVwIO9OQg3C/vT+tN7YBXjfejcGcCDnTjSLizqgGvFu8T4c4EHAjvTLizagGvEu8L4c4EHAhrQrizKgEvHu+J4c4EHAhnRriz4gEvGu+Z4c4EHAhjQbizogEvFu+F4c4EHGjeinBnxQJeJN4rw50JONCsAuHOigR8dbwLhTsTcKA5BcOdrQ74qngXDncm4EAzKoQ7WxXwxfGuFO5MwIHdVQx3tjjgi+JdOdyZgAO72SDc2aKAX819wUbhTvfv/+v95wFsZsNw3/rxh29++s/cF82aeW8Y7kNm4MBmNg73oevvfn71Zuo/nhzvncKdCThQ3Y7hziYHfFK8dw53JuBANQ2EO5sU8IvxbiTcmYADxTUU7uxiwM/Gu7FwZwIOFNNguLOzAT8Z70bDnQk4sFrD4c5OBvxovBsPdybgwGIBwp0dDfiTeAcJdybgwGyBwp09CfiDeAcLdybgwGQBw509CPineAcNdybgwEWBw519CvhdvIOHOxNw4KQOwp3dBfxZJ+HOBBx4oqNwZ9dX9yfTQ7iTxayAxzoM95182eT17cpW+x9OMWbgQK/h/njZJP9JwIGe9BzudORWQQEHwus93OnEQzoCDoQ1QrjTmcfjBRwIZ5RwpwsLUwk4EMZI4U4TloQVcKB5o4U7TdyMQcCBZo0Y7jRjGzQBB5ozarjTzA2IBRxoxsjhTnPinQQcaMTo4U5z450EHNiZcH80O95JwIGdCPffFsU7CTiwMeF+aHG8k4ADGxHup1bFOwk4UJlwH7c63knAgUqE+7SrEkfyxc1v1yml1QfTEDvywM46DffthPDbEm9UZOadmYEDJXQc7q+++/nVnyXerGi8k4ADKwn3NMXjnQQcWEi4p6sS7yTgwEzCPU+1eCcBByYS7vmqxjsJOHCBcC9TPd5JwIEThHu5TeKdBBx4RLjX2SzeScCBe8K93qbxTgIOwxPuMjaPdxJwGJZwl7NLvJOAw3CEu6zd4p0EHIYh3OXtGu8k4NA94a5j93gnAYduCXc9TcQ7CTh0R7jraibeScChG8JdX1PxTgIO4Qn3NpqLdxJwCEu4t9NkvJOAQzjCva1m450EHMIQ7u01He8k4NA84d5H8/FOAg7NEu79hIh3EnBojnDvK0y8k4BDM4R7f6HinQQcdifcbQgX7yTgsBvhbkfIeCcBh80Jd1vCxjsJOGxGuNsTOt5JwKE64W5T+HgnAYdqhLtdXcQ7CTgUJ9xt6ybeScChGOFuX1fxTgIOqwl3DN3FOwk4LCbccXQZ7yTgMJtwx9JtvJOAw2TCHU/X8U4CDhcJd0zdxzsJOJwk3HENEe8k4PCEcMc2TLyTgMMnwh3fUPFOAg7C3Ynh4p0EnIEJdz+GjHcScAYk3H0ZNt5JwBmIcPdn6HgnAWcAwt2n4eOdBJyOCXe/xPuegNMb4e6beB8QcHoh3P0T70cEnOiEewzifYSAE5Vwj0O8TxBwohHusYj3GQJOFMI9HvG+QMBpnXCPSbwnEHBaJdzjEu+JBJzWCPfYxHsGAacVwo14zyTg7E24SeK9jICzF+EmE++FBJytCTeHxHsFAWcrws1j4r2SgFObcHOMeBcg4NQi3Jwi3oUIOKUJN+eId0ECTinCzSXiXZiAs5ZwM4V4VyDgLCXcTCXelQg4cwk3c4h3RQLOVMLNXOJdmYBziXCzhHhvQMA5RbhZSrw3IuA8JtysId4bEnAy4WYt8d6YgCPclCDeOxDwcQk3pYj3TgR8PMJNSeK9IwEfh3BTmnjvTMD7J9zUIN4NEPB+CTe1iHcjBLw/wk1N4t0QAe+HcFObeDdGwOMTbrYg3g0S8LiEm62Id6MEPB7hZkvi3TABj0O42Zp4N07A2yfc7EG8AxDwdgk3exHvIAS8PcLNnsQ7EAFvh3CzN/EORsD3J9y0QLwDEvD9CDetuPJNxPPFzW/XKaU3HZ3SXRD/ePFlhCAKN00Q76A6DHgUPd2jLtyBuWwSXCeXUEJd9/7hm59ux/t1A4eyhnAHJ94dCB7wkHecBA+4cHdAvDsRNOCh7/UOGnDh7oR4dyRYwLt4yjJYwIW7I+LdmSAB72p9kyABF+7OiHeHGg94lysLNh5w4e6QeHeq0YB3vaZ3owEX7k6Jd8caC/gQu+k0FnDh7ph4d66RgA+1j2UjARfuzon3AHYO+JA7yO8ccOEegMfjB7Djo/S3EfnHaOG+9d3Pr27H+3qHjxbuQZh5D2TjGfi7+xn30BHZeAYu3AMR78FsFHDhPrBRwIV7MOI9oMoBF+4jKgdcuAck3oOqFHDhPqNSwIV7UOI9sMIBF+4JCgdcuAcm3oMrFHDhnqFQwIV7cOLN2oAL9wIrAy7ciDcfLQy4cK+wMODCzR3x5pOZARfuAmYGXLj5RLx5YGLAhbugiQEXbh4Qb564EHDhruBCwIWbJ8Sbo04EXLgrOhFw4eYo8eakRwEX7g08Crhwc5J4c9Z9wP8l3Nu5D/hL4eaklNL/ASse9nt5iMI0AAAAAElFTkSuQmCC"}}]);