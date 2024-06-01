import{A as f,E as _,u as X,a as E,r as N,b as A,c as B,g as D,j as e,R as C,Q as o,d as ee,e as ae,S as I,f as se,l as re,K as P,C as Y,W as ne,O as ie,H as le,B as de,F as te,h as oe,i as ce}from"./index-e8c50a84.js";const he=async d=>(await f.post(_.CREATE_ORDER,d.data,{headers:{Authorization:d.token}})).data,ue=async d=>(await f.get(`${_.VALIDATE_PIN}/${d}`)).data,xe=async d=>(await f.post(_.VERIFY_PAYMENT,d.data,{headers:{Authorization:d.token}})).data,pe="/assets/icons/android-chrome-192x192.png",je=()=>{const d=X(),{isLoading:u,mutateAsync:j}=E(P.CREATE_ORDER,he),[k,$]=N.useState(!1),{isLoading:w,mutateAsync:G}=E(P.VERIFY_PAYMENT,xe),{data:c,error:z,isLoading:R,mutateAsync:Z}=E(P.VALIDATE_PIN,ue),x=A(r=>r.cartReducer.cartItem),O=A(r=>r.personalDetailsReducer.token),a=A(r=>r.personalDetailsReducer.profileData),T=B(),S=N.useMemo(()=>x.length>0?x.reduce((r,i)=>r+(i==null?void 0:i.totalPrice),0):0,[x]),q=N.useMemo(()=>D(c,z),[c,z]),[s,J]=N.useState({firstName:a!=null&&a.name?a==null?void 0:a.name:"",lastName:"",companyName:"",country:a!=null&&a.country?a==null?void 0:a.country:"India",streetAddress1:a!=null&&a.address?a==null?void 0:a.address:"",streetAddress2:"",city:a!=null&&a.city?a==null?void 0:a.city:"",state:a!=null&&a.state?a==null?void 0:a.state:"Andhra Pradesh",zip:a!=null&&a.zipCode?a==null?void 0:a.zipCode:"",phone:a!=null&&a.phoneNumber?a==null?void 0:a.phoneNumber:"",email:a!=null&&a.email?a==null?void 0:a.email:"",notes:""}),t=(r,i)=>{J(p=>({...p,[r]:i.target.value}))},W=()=>{$(r=>!r)},Q=()=>{var r;if(((r=c==null?void 0:c.data)==null?void 0:r.pincode)!==s.zip){if(!C.ZIP.test(s.zip)){o.warn("Please enter a valid 6 digit Pin Code");return}Z(s.zip).then(i=>{if(i.status===200){o.success(i==null?void 0:i.message);return}throw i==null?void 0:i.error}).catch(i=>{var p,b,m,v;return o.error((b=(p=i.response)==null?void 0:p.data)!=null&&b.error?(v=(m=i.response)==null?void 0:m.data)==null?void 0:v.error:"Unable to check this PIN Code availability!")})}},L=async()=>{await d.invalidateQueries(P.ORDERS)},V=r=>{var v,M;r.preventDefault();const i=ee([{key:"First Name",value:s.firstName},{key:"Last Name",value:s.lastName},{key:"Country",value:s.country},{key:"Street Address",value:s.streetAddress1},{key:"City",value:s.city},{key:"State",value:s.state},{key:"Postal Code",value:s.zip},{key:"Phone Number",value:s.phone},{key:"Email Address",value:s.email}]);if(i){o.error(i);return}const p=ae([{key:"Phone Number",value:s.phone,regex:C.PHONE},{key:"Email",value:s.email,regex:C.EMAIL},{key:"Postal Code",value:s.zip,regex:C.ZIP}]);if(p){o.error(p);return}if(((v=c==null?void 0:c.data)==null?void 0:v.pincode)!==s.zip){o.error("Please check PIN Code availability first!");return}if(!((M=c==null?void 0:c.data)!=null&&M.is_deliverable)){o.error("Delivery not available on this pincode");return}if(u||w||R)return;const b=x.map(n=>({size:n==null?void 0:n.size,quantity:n==null?void 0:n.quantity,colorId:n==null?void 0:n.colorId,productId:n==null?void 0:n._id})),m={payment_type:k?"ONLINE":"COD",additional_info:s.notes,delivery_details:{firstName:s.firstName,lastName:s.lastName,companyName:s.companyName,streetAddress1:s.streetAddress1,streetAddress2:s.streetAddress2,city:s.city,state:s.state,zip:s.zip,country:s.country,phone:s.phone,email:s.email},products_details:b};j({data:m,token:O}).then(async n=>{if(n.status===200){if(m.payment_type==="COD"){L(),o.success(n==null?void 0:n.message),T(I.PROFILE,{state:{isOrderActive:!0}});return}se(Y.RAZORPAY_SCRIPT)||await re(Y.RAZORPAY_SCRIPT);const g={order_id:n.data.order_id,name:"the zenky",key:"rzp_test_cFhbLEd61xfdx6",image:pe,theme:{color:"#262626"},handler:async h=>{G({data:{orderId:h.razorpay_order_id,paymentId:h.razorpay_payment_id},token:O}).then(l=>{l.status===200&&(L(),o.success(l==null?void 0:l.message),T(I.PROFILE,{state:{isOrderActive:!0}}))}).catch(l=>{var H,F,K,U;return o.error((F=(H=l.response)==null?void 0:H.data)!=null&&F.error?(U=(K=l.response)==null?void 0:K.data)==null?void 0:U.error:"Unable to verify payment!")})}},y=new window.Razorpay(g);y.on("payment.failed",function(h){var l;o.error(((l=h==null?void 0:h.error)==null?void 0:l.description)||"Unable to process your payment! Please try again later.")}),y.open()}}).catch(n=>{var g,y,h,l;return o.error((y=(g=n.response)==null?void 0:g.data)!=null&&y.error?(l=(h=n.response)==null?void 0:h.data)==null?void 0:l.error:"Unable to place order right now!")})};return e.jsxs("form",{className:"row",onSubmit:V,children:[e.jsx("div",{className:"col-lg-7",children:e.jsxs("div",{className:"billing-info-wrap mr-100",children:[e.jsx("h3",{children:"Billing Details"}),e.jsxs("div",{className:"row",children:[e.jsx("div",{className:"col-lg-6 col-md-6",children:e.jsxs("div",{className:"billing-info mb-25",children:[e.jsxs("label",{children:["First name"," ",e.jsx("abbr",{className:"required",title:"Required",children:"*"})]}),e.jsx("input",{type:"text",value:s.firstName,onChange:t.bind(void 0,"firstName"),required:!0})]})}),e.jsx("div",{className:"col-lg-6 col-md-6",children:e.jsxs("div",{className:"billing-info mb-25",children:[e.jsxs("label",{children:["Last name"," ",e.jsx("abbr",{className:"required",title:"Required",children:"*"})]}),e.jsx("input",{type:"text",value:s.lastName,onChange:t.bind(void 0,"lastName"),required:!0})]})}),e.jsx("div",{className:"col-lg-12",children:e.jsxs("div",{className:"billing-info mb-25",children:[e.jsx("label",{children:"Company name (optional) "}),e.jsx("input",{type:"text",value:s.companyName,onChange:t.bind(void 0,"companyName")})]})}),e.jsx("div",{className:"col-lg-12",children:e.jsxs("div",{className:"billing-select mb-25",children:[e.jsxs("label",{children:["Country"," ",e.jsx("abbr",{className:"required",title:"Required",children:"*"})]}),e.jsx("select",{className:"select-active",value:s.country,onChange:t.bind(void 0,"country"),required:!0,children:e.jsx("option",{value:"India",children:"India"})})]})}),e.jsx("div",{className:"col-lg-12",children:e.jsxs("div",{className:"billing-info mb-25",children:[e.jsxs("label",{children:["Street address"," ",e.jsx("abbr",{className:"required",title:"Required",children:"*"})]}),e.jsx("input",{className:"billing-address",placeholder:"House number and street name",type:"text",value:s.streetAddress1,onChange:t.bind(void 0,"streetAddress1"),required:!0}),e.jsx("input",{placeholder:"Apartment, suite, unit etc. (optional)",type:"text",value:s.streetAddress2,onChange:t.bind(void 0,"streetAddress2")})]})}),e.jsx("div",{className:"col-lg-12",children:e.jsxs("div",{className:"billing-info mb-25",children:[e.jsxs("label",{children:["Town / City"," ",e.jsx("abbr",{className:"required",title:"Required",children:"*"})]}),e.jsx("input",{type:"text",value:s.city,onChange:t.bind(void 0,"city"),required:!0})]})}),e.jsx("div",{className:"col-lg-12",children:e.jsxs("div",{className:"billing-select mb-25",children:[e.jsxs("label",{children:["State"," ",e.jsx("abbr",{className:"required",title:"Required",children:"*"})]}),e.jsxs("select",{className:"select-active",value:s.state,onChange:t.bind(void 0,"state"),required:!0,children:[e.jsx("option",{value:"Andhra Pradesh",children:"Andhra Pradesh"}),e.jsx("option",{value:"Andaman and Nicobar Islands",children:"Andaman and Nicobar Islands"}),e.jsx("option",{value:"Arunachal Pradesh",children:"Arunachal Pradesh"}),e.jsx("option",{value:"Assam",children:"Assam"}),e.jsx("option",{value:"Bihar",children:"Bihar"}),e.jsx("option",{value:"Chandigarh",children:"Chandigarh"}),e.jsx("option",{value:"Chhattisgarh",children:"Chhattisgarh"}),e.jsx("option",{value:"Dadar and Nagar Haveli",children:"Dadar and Nagar Haveli"}),e.jsx("option",{value:"Daman and Diu",children:"Daman and Diu"}),e.jsx("option",{value:"Delhi",children:"Delhi"}),e.jsx("option",{value:"Lakshadweep",children:"Lakshadweep"}),e.jsx("option",{value:"Puducherry",children:"Puducherry"}),e.jsx("option",{value:"Goa",children:"Goa"}),e.jsx("option",{value:"Gujarat",children:"Gujarat"}),e.jsx("option",{value:"Haryana",children:"Haryana"}),e.jsx("option",{value:"Himachal Pradesh",children:"Himachal Pradesh"}),e.jsx("option",{value:"Jammu and Kashmir",children:"Jammu and Kashmir"}),e.jsx("option",{value:"Jharkhand",children:"Jharkhand"}),e.jsx("option",{value:"Karnataka",children:"Karnataka"}),e.jsx("option",{value:"Kerala",children:"Kerala"}),e.jsx("option",{value:"Madhya Pradesh",children:"Madhya Pradesh"}),e.jsx("option",{value:"Maharashtra",children:"Maharashtra"}),e.jsx("option",{value:"Manipur",children:"Manipur"}),e.jsx("option",{value:"Meghalaya",children:"Meghalaya"}),e.jsx("option",{value:"Mizoram",children:"Mizoram"}),e.jsx("option",{value:"Nagaland",children:"Nagaland"}),e.jsx("option",{value:"Odisha",children:"Odisha"}),e.jsx("option",{value:"Punjab",children:"Punjab"}),e.jsx("option",{value:"Rajasthan",children:"Rajasthan"}),e.jsx("option",{value:"Sikkim",children:"Sikkim"}),e.jsx("option",{value:"Tamil Nadu",children:"Tamil Nadu"}),e.jsx("option",{value:"Telangana",children:"Telangana"}),e.jsx("option",{value:"Tripura",children:"Tripura"}),e.jsx("option",{value:"Uttar Pradesh",children:"Uttar Pradesh"}),e.jsx("option",{value:"Uttarakhand",children:"Uttarakhand"}),e.jsx("option",{value:"West Bengal",children:"West Bengal"})]})]})}),e.jsx("div",{className:"col-lg-12 col-md-12",children:e.jsxs("div",{className:"billing-info mb-25 ",children:[e.jsxs("label",{children:["Postcode / ZIP"," ",e.jsx("abbr",{className:"required",title:"Required",children:"*"})]}),e.jsxs("div",{className:"pin",children:[e.jsx("input",{type:"text",value:s.zip,className:q.className,onChange:t.bind(void 0,"zip"),required:!0}),e.jsx("span",{onClick:R?void 0:Q,children:R?"Checking":"Check"})]}),e.jsx("small",{className:q.className,children:q.text})]})}),e.jsx("div",{className:"col-lg-12 col-md-12",children:e.jsxs("div",{className:"billing-info mb-25",children:[e.jsxs("label",{children:["Phone"," ",e.jsx("abbr",{className:"required",title:"Required",children:"*"})]}),e.jsx("input",{type:"text",value:s.phone,onChange:t.bind(void 0,"phone"),maxLength:10,required:!0})]})}),e.jsx("div",{className:"col-lg-12 col-md-12",children:e.jsxs("div",{className:"billing-info mb-25",children:[e.jsxs("label",{children:["Email Address"," ",e.jsx("abbr",{className:"required",title:"Required",children:"*"})]}),e.jsx("input",{type:"text",value:s.email,onChange:t.bind(void 0,"email"),required:!0})]})})]}),e.jsxs("div",{className:"additional-info-wrap",children:[e.jsx("h3",{children:"Additional information"}),e.jsx("label",{children:"Order notes (optional)"}),e.jsx("textarea",{placeholder:"Notes about your order, e.g. special notes for delivery. ",name:"message",value:s.notes,onChange:t.bind(void 0,"notes")})]})]})}),e.jsx("div",{className:"col-lg-5",children:e.jsxs("div",{className:"your-order-area",children:[e.jsx("h3",{children:"Your order"}),e.jsxs("div",{className:"your-order-wrap gray-bg-4",children:[e.jsxs("div",{className:"your-order-info-wrap",children:[e.jsx("div",{className:"your-order-info",children:e.jsx("ul",{children:e.jsxs("li",{children:["Product ",e.jsx("span",{children:"Total"})]})})}),e.jsx("div",{className:"your-order-middle",children:e.jsx("ul",{children:x==null?void 0:x.map(r=>e.jsxs("li",{children:[r==null?void 0:r.name," X ",r==null?void 0:r.quantity," ",e.jsxs("span",{children:["₹",r==null?void 0:r.totalPrice," "]})]},`checkout_item_${r==null?void 0:r._id}_${r==null?void 0:r.colorName}_${r==null?void 0:r.size}`))})}),e.jsx("div",{className:"your-order-info order-subtotal",children:e.jsx("ul",{children:e.jsxs("li",{children:["Subtotal ",e.jsxs("span",{children:["₹",S]})]})})}),e.jsx("div",{className:"your-order-info order-total",children:e.jsx("ul",{children:e.jsxs("li",{children:["Total ",e.jsxs("span",{children:["₹",S]})]})})})]}),!1,e.jsx("div",{className:`payment-method ${k?"":"active"}`,children:e.jsxs("div",{className:"d-flex align-items-center",children:[e.jsx("input",{type:"radio",name:"payment",id:"cod",checked:!k,onChange:W}),e.jsx("label",{htmlFor:"cod",children:"Cash On Delivery"})]})}),e.jsxs("div",{className:"condition-wrap",children:[e.jsxs("p",{children:["Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our"," ",e.jsx("a",{href:"#",children:"privacy policy"})]}),e.jsxs("div",{className:"condition-form mb-25",children:[e.jsx("input",{type:"checkbox",required:!0}),e.jsxs("span",{children:["I have read and agree to the website"," ",e.jsx("a",{href:"#",children:"terms and conditions"}),e.jsx("span",{className:"star",children:"*"})]})]})]})]}),e.jsx("div",{className:"Place-order mt-30",children:e.jsx("button",{type:"submit",children:u||w?e.jsx("div",{className:"loading-spinner"}):"Place Order"})})]})})]})},me=()=>e.jsx("div",{className:"checkout-main-area pt-100 pb-100",children:e.jsx("div",{className:"container",children:e.jsx("div",{className:"checkout-wrap",children:e.jsx(je,{})})})}),ye=()=>{const d=A(j=>j.cartReducer.cartItem.length),u=B();return N.useEffect(()=>{d<1&&u(I.CART)},[d]),e.jsxs(ne,{children:[e.jsx(ie,{}),e.jsx(le,{}),e.jsx(de,{title:"Checkout"}),e.jsx(me,{}),e.jsx(te,{}),e.jsx(oe,{}),e.jsx(ce,{})]})};export{ye as default};