import svgPaths from "./svg-7ns0rupa25";
import imgImageValu from "figma:asset/dd263ea74eea751edbe19c75046ad4c686cd593c.png";
import imgDbttPresentation1 from "figma:asset/0d4da112053d8c5cbb0e413fdddb627192758ce3.png";

function ImageValu() {
  return (
    <div className="h-[31.993px] relative rounded-[8px] shrink-0 w-[39.678px]" data-name="Image (Valu$)">
      <div aria-hidden="true" className="absolute bg-clip-padding border-0 border-[transparent] border-solid inset-0 pointer-events-none rounded-[8px]">
        <div className="absolute bg-clip-padding bg-white border-0 border-[transparent] border-solid inset-0 rounded-[8px]" />
        <img alt="" className="absolute bg-clip-padding border-0 border-[transparent] border-solid max-w-none object-cover rounded-[8px] size-full" src={imgImageValu} />
      </div>
    </div>
  );
}

function Text() {
  return (
    <div className="h-[24.003px] relative shrink-0 w-[81.85px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[24px] left-0 not-italic text-[16px] text-white top-[-0.83px] tracking-[-0.3125px] whitespace-nowrap">Valu$ Wholesale</p>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="h-[31.993px] relative shrink-0 w-[129.518px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[7.99px] items-center relative size-full">
        <ImageValu />
        <Text />
      </div>
    </div>
  );
}

function Link() {
  return (
    <div className="h-[60px] relative shrink-0 w-[53.938px]" data-name="Link">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[4px] not-italic text-[#6a7282] text-[14px] top-[20.5px] tracking-[-0.1504px] whitespace-nowrap">Pricing</p>
      </div>
    </div>
  );
}

function Link1() {
  return (
    <div className="h-[36px] relative shrink-0 w-[64.133px]" data-name="Link">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[12px] not-italic text-[#6a7282] text-[14px] top-[8.5px] tracking-[-0.1504px] whitespace-nowrap">Log In</p>
      </div>
    </div>
  );
}

function Link2() {
  return (
    <div className="bg-[#f0b100] flex-[1_0_0] h-[36px] min-h-px min-w-px relative rounded-[8px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)]" data-name="Link">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[16px] not-italic text-[14px] text-white top-[8.5px] tracking-[-0.1504px] whitespace-nowrap">Apply for Wholesale</p>
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="h-[64px] relative shrink-0 w-[346.359px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[32px] items-center relative size-full">
        <Link />
        <Link1 />
        <Link2 />
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="content-stretch flex h-[64px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container1 />
      <Container2 />
    </div>
  );
}

function Header() {
  return (
    <div className="bg-[#ff6900] h-[65px] relative shrink-0 w-full" data-name="Header">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-b border-solid inset-0 pointer-events-none shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)]" />
      <div className="content-stretch flex flex-col items-start pb-px px-[32px] relative size-full">
        <Container />
      </div>
    </div>
  );
}

function Heading() {
  return (
    <div className="absolute content-stretch flex h-[36px] items-start left-[32px] top-[56px] w-[382px]" data-name="Heading 2">
      <p className="flex-[1_0_0] font-['Inter:Extra_Bold',sans-serif] font-extrabold leading-[36px] min-h-px min-w-px not-italic relative text-[#101828] text-[30px] text-center tracking-[0.3955px]">Sign in to your account</p>
    </div>
  );
}

function EmailInput() {
  return (
    <div className="absolute h-[38px] left-0 rounded-tl-[8px] rounded-tr-[8px] top-0 w-[382px]" data-name="Email Input">
      <div className="content-stretch flex items-center overflow-clip px-[12px] py-[8px] relative rounded-[inherit] size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#6a7282] text-[14px] tracking-[-0.1504px] whitespace-nowrap">Email address</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none rounded-tl-[8px] rounded-tr-[8px]" />
    </div>
  );
}

function PasswordInput() {
  return (
    <div className="absolute h-[38px] left-0 rounded-bl-[8px] rounded-br-[8px] top-[37px] w-[382px]" data-name="Password Input">
      <div className="content-stretch flex items-center overflow-clip px-[12px] py-[8px] relative rounded-[inherit] size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#6a7282] text-[14px] tracking-[-0.1504px] whitespace-nowrap">Password</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none rounded-bl-[8px] rounded-br-[8px]" />
    </div>
  );
}

function Container4() {
  return (
    <div className="bg-[rgba(255,255,255,0)] h-[75px] relative rounded-[8px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)] shrink-0 w-full" data-name="Container">
      <EmailInput />
      <PasswordInput />
    </div>
  );
}

function Button() {
  return (
    <div className="absolute bg-[#ff6900] content-stretch flex h-[38px] items-start justify-center left-0 px-[17px] py-[9px] rounded-[8px] top-0 w-[183px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[14px] text-center text-white tracking-[-0.1504px] whitespace-nowrap">Login</p>
    </div>
  );
}

function Button1() {
  return (
    <div className="absolute bg-[#27286f] content-stretch flex h-[38px] items-start justify-center left-[199px] px-[17px] py-[9px] rounded-[8px] top-0 w-[183px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[14px] text-center text-white tracking-[-0.1504px] whitespace-nowrap">Sign up</p>
    </div>
  );
}

function Container5() {
  return (
    <div className="h-[38px] relative shrink-0 w-full" data-name="Container">
      <Button />
      <Button1 />
    </div>
  );
}

function Form() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[24px] h-[137px] items-start left-[32px] top-[124px] w-[382px]" data-name="Form">
      <Container4 />
      <Container5 />
    </div>
  );
}

function Container3() {
  return (
    <div className="absolute bg-white border border-[#f3f4f6] border-solid h-[295px] left-[804px] rounded-[14px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)] top-[157px] w-[448px]" data-name="Container">
      <Heading />
      <Form />
    </div>
  );
}

function Group1() {
  return (
    <div className="absolute contents inset-[87.31%_68.13%_10.75%_29.49%]">
      <div className="absolute inset-[87.31%_69.72%_10.75%_29.49%]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.1305 12.1825">
          <path d={svgPaths.p11708800} fill="var(--fill-0, #ACB2BC)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[87.31%_68.13%_10.75%_31.08%]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.1305 12.1825">
          <path d={svgPaths.p11708800} fill="var(--fill-0, #ACB2BC)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Group() {
  return (
    <div className="absolute contents inset-[87.4%_71.27%_10.66%_26.35%]">
      <div className="absolute inset-[87.4%_72.86%_10.66%_26.35%]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.1305 12.1825">
          <path d={svgPaths.p11708800} fill="var(--fill-0, #ACB2BC)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[87.4%_71.27%_10.66%_27.94%]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.1305 12.1825">
          <path d={svgPaths.p11708800} fill="var(--fill-0, #ACB2BC)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Group2() {
  return (
    <div className="absolute contents inset-[87.31%_68.13%_10.66%_26.35%]">
      <Group1 />
      <Group />
    </div>
  );
}

function Dots() {
  return (
    <div className="absolute contents inset-[86.78%_68.13%_10.19%_24.29%]" data-name="Dots">
      <Group2 />
      <div className="absolute inset-[86.78%_74.47%_10.19%_24.29%]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.3703 19.0121">
          <path d={svgPaths.p2ad0af80} fill="var(--fill-0, #27286F)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function ImageValu1() {
  return (
    <div className="absolute bg-white border-3 border-[#f3f4f6] border-solid h-[295px] left-[142px] overflow-clip rounded-[14px] top-[115px] w-[497px]" data-name="Image (Valu$)">
      <div className="absolute h-[295px] left-[-3px] top-[-3px] w-[497px]" data-name="dbtt presentation 1">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-[166.68%] left-[-37.79%] max-w-none top-[-37.83%] w-[175.89%]" src={imgDbttPresentation1} />
        </div>
      </div>
    </div>
  );
}

function MaterialSymbolsHelpOutline() {
  return (
    <div className="absolute left-[804px] size-[24px] top-[115px]" data-name="material-symbols:help-outline">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="material-symbols:help-outline">
          <path d={svgPaths.p3a4e0f00} fill="var(--fill-0, #27286F)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Help() {
  return (
    <div className="absolute contents left-[804px] top-[115px]" data-name="help">
      <MaterialSymbolsHelpOutline />
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold inset-[18.95%_34.93%_78.34%_59.36%] leading-[normal] not-italic text-[#27286f] text-[14px] tracking-[-0.1504px] whitespace-nowrap">Help Centre</p>
    </div>
  );
}

function Login1() {
  return (
    <div className="bg-[#f9fafb] h-[628px] relative shrink-0 w-full" data-name="Login">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Container3 />
        <Dots />
        <p className="-translate-x-1/2 absolute font-['Inter:Extra_Bold',sans-serif] font-extrabold leading-[36px] left-[391px] not-italic text-[#6a7282] text-[30px] text-center top-[441px] tracking-[0.3955px] w-[456px]">{`Track your Deals & Membership Status`}</p>
        <ImageValu1 />
        <Help />
      </div>
    </div>
  );
}

function MainContent() {
  return (
    <div className="flex-[579_0_0] min-h-px min-w-px relative w-full" data-name="Main Content">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Login1 />
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col items-center justify-center px-[359px] relative w-full">
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#6a7282] text-[14px] text-center tracking-[-0.1504px] whitespace-nowrap">© 2026 Valu$ Shop. All rights reserved. Wholesale only.</p>
        </div>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <div className="bg-white h-[85px] relative shrink-0 w-full" data-name="Footer">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-solid border-t inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[33px] relative size-full">
        <Container6 />
      </div>
    </div>
  );
}

function PublicLayout() {
  return (
    <div className="bg-[#f9fafb] content-stretch flex flex-col h-[713px] items-start relative shrink-0 w-full" data-name="PublicLayout">
      <MainContent />
      <Footer />
    </div>
  );
}

export default function Login() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start relative size-full" data-name="/login">
      <Header />
      <PublicLayout />
    </div>
  );
}