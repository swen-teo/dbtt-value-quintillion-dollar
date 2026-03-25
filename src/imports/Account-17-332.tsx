import svgPaths from "./svg-1m6ceou4ws";
import imgImage from "figma:asset/dd263ea74eea751edbe19c75046ad4c686cd593c.png";

function Image() {
  return (
    <div className="h-[31.983px] relative shrink-0 w-full" data-name="Image">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage} />
    </div>
  );
}

function Container2() {
  return (
    <div className="h-[31.983px] relative rounded-[8px] shrink-0 w-[39.683px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] size-full">
        <Image />
      </div>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="h-[24px] relative shrink-0 w-[126.533px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[24px] left-0 not-italic text-[16px] text-white top-[-1.93px] tracking-[-0.3125px] whitespace-nowrap">Valu$ Wholesale</p>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="h-[31.983px] relative shrink-0 w-[174.2px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[7.983px] items-center relative size-full">
        <Container2 />
        <Paragraph />
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="absolute bg-[#ff6900] content-stretch flex h-[63.983px] items-center left-0 pl-[15.983px] top-0 w-[255.433px]" data-name="Container">
      <Container1 />
    </div>
  );
}

function Icon() {
  return (
    <div className="absolute left-[7.98px] size-[20px] top-[7.98px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p1726bb80} id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.38889" />
          <path d={svgPaths.p34d64900} id="Vector_2" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.38889" />
          <path d={svgPaths.p616c000} id="Vector_3" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.38889" />
          <path d="M1.66667 5.83333H18.3333" id="Vector_4" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.38889" />
          <path d={svgPaths.p16101ce0} id="Vector_5" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.38889" />
        </g>
      </svg>
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="absolute h-[20px] left-[39.98px] top-[8.65px] w-[33.967px]" data-name="Paragraph">
      <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[17.5px] not-italic text-[#4a5565] text-[14px] text-center top-[0.07px] tracking-[-0.1504px] whitespace-nowrap">Shop</p>
    </div>
  );
}

function Button() {
  return (
    <div className="absolute h-[35.983px] left-[7.98px] rounded-[8px] top-[15.98px] w-[240.017px]" data-name="Button">
      <Icon />
      <Paragraph1 />
    </div>
  );
}

function Icon1() {
  return (
    <div className="absolute left-[7.98px] size-[20px] top-[7.98px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p3a7b500} id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.38889" />
        </g>
      </svg>
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="absolute h-[20px] left-[39.98px] top-[8.65px] w-[78.833px]" data-name="Paragraph">
      <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[39.5px] not-italic text-[#4a5565] text-[14px] text-center top-[0.07px] tracking-[-0.1504px] whitespace-nowrap">Quick Order</p>
    </div>
  );
}

function Button1() {
  return (
    <div className="absolute h-[35.983px] left-[7.98px] rounded-[8px] top-[55.95px] w-[240.017px]" data-name="Button">
      <Icon1 />
      <Paragraph2 />
    </div>
  );
}

function Icon2() {
  return (
    <div className="absolute left-[7.98px] size-[20px] top-[7.98px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p32514c00} id="Vector" stroke="var(--stroke-0, #CA3500)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.38889" />
          <path d={svgPaths.p2734ea00} id="Vector_2" stroke="var(--stroke-0, #CA3500)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.38889" />
          <path d={svgPaths.p346d1b80} id="Vector_3" stroke="var(--stroke-0, #CA3500)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.38889" />
        </g>
      </svg>
    </div>
  );
}

function Paragraph3() {
  return (
    <div className="absolute h-[20px] left-[39.98px] top-[8.65px] w-[28.033px]" data-name="Paragraph">
      <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[14.5px] not-italic text-[#ca3500] text-[14px] text-center top-[0.07px] tracking-[-0.1504px] whitespace-nowrap">Cart</p>
    </div>
  );
}

function Button2() {
  return (
    <div className="absolute bg-[#fff7ed] h-[35.983px] left-[7.98px] rounded-[8px] top-[95.92px] w-[240.017px]" data-name="Button">
      <Icon2 />
      <Paragraph3 />
    </div>
  );
}

function Icon3() {
  return (
    <div className="absolute left-[7.98px] size-[20px] top-[7.98px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p2026e800} id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.38889" />
          <path d={svgPaths.p6f5b580} id="Vector_2" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.38889" />
        </g>
      </svg>
    </div>
  );
}

function Paragraph4() {
  return (
    <div className="absolute h-[20px] left-[39.98px] top-[8.65px] w-[54.983px]" data-name="Paragraph">
      <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[27px] not-italic text-[#4a5565] text-[14px] text-center top-[0.07px] tracking-[-0.1504px] whitespace-nowrap">Account</p>
    </div>
  );
}

function Button3() {
  return (
    <div className="absolute h-[35.983px] left-[7.98px] rounded-[8px] top-[135.88px] w-[240.017px]" data-name="Button">
      <Icon3 />
      <Paragraph4 />
    </div>
  );
}

function Icon4() {
  return (
    <div className="absolute left-0 size-[32px] top-0" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g clipPath="url(#clip0_17_99)" id="Icon">
          <path d={svgPaths.p22b77000} fill="var(--fill-0, #D1D5DC)" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_17_99">
            <rect fill="white" height="32" width="32" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text() {
  return (
    <div className="absolute bg-[#f3f4f6] left-0 overflow-clip rounded-[16777200px] size-[32px] top-0" data-name="Text">
      <Icon4 />
    </div>
  );
}

function Paragraph5() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-0 not-italic text-[#364153] text-[14px] top-[0.5px] tracking-[-0.1504px] whitespace-nowrap">Mama Shop #493</p>
    </div>
  );
}

function Paragraph6() {
  return (
    <div className="h-[16px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[16px] left-0 not-italic text-[#155dfc] text-[12px] top-px whitespace-nowrap">Trade Prime</p>
    </div>
  );
}

function Container6() {
  return (
    <div className="absolute content-stretch flex flex-col h-[36px] items-start left-[44px] top-px w-[116.984px]" data-name="Container">
      <Paragraph5 />
      <Paragraph6 />
    </div>
  );
}

function Container5() {
  return (
    <div className="h-[38px] relative shrink-0 w-full" data-name="Container">
      <Text />
      <Container6 />
    </div>
  );
}

function Icon5() {
  return (
    <div className="absolute left-0 size-[20px] top-0" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p38966ca0} id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p14ca9100} id="Vector_2" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M17.5 10H7.5" id="Vector_3" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Link() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Link">
      <Icon5 />
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[32px] not-italic text-[#4a5565] text-[14px] top-[0.5px] tracking-[-0.1504px] whitespace-nowrap">Sign Out</p>
    </div>
  );
}

function Container4() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[16px] h-[107px] items-start left-0 pt-[17px] px-[16px] top-[558px] w-[255px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-solid border-t inset-0 pointer-events-none" />
      <Container5 />
      <Link />
    </div>
  );
}

function Container3() {
  return (
    <div className="absolute h-[645.933px] left-0 top-[63.98px] w-[255.983px]" data-name="Container">
      <Button />
      <Button1 />
      <Button2 />
      <Button3 />
      <Container4 />
    </div>
  );
}

function Sidebar() {
  return (
    <div className="bg-white h-[729px] relative shrink-0 w-[256px]" data-name="Sidebar">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Container />
        <Container3 />
      </div>
    </div>
  );
}

function Heading() {
  return (
    <div className="h-[32px] relative shrink-0 w-full" data-name="Heading 1">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[32px] left-0 not-italic text-[#101828] text-[24px] top-0 tracking-[0.0703px] whitespace-nowrap">Account Management</p>
    </div>
  );
}

function Link1() {
  return (
    <div className="h-[64px] relative rounded-[4px] shrink-0 w-full" data-name="Link">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-[8px] not-italic text-[#4a5565] text-[16px] top-[7.5px] tracking-[-0.3125px] w-[67px]">{`Profile & Business`}</p>
    </div>
  );
}

function Link2() {
  return (
    <div className="h-[64px] relative rounded-[4px] shrink-0 w-full" data-name="Link">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-[8px] not-italic text-[#4a5565] text-[16px] top-[7.5px] tracking-[-0.3125px] w-[94px]">Subscription (Prime)</p>
    </div>
  );
}

function Link3() {
  return (
    <div className="h-[40px] relative rounded-[4px] shrink-0 w-full" data-name="Link">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-[8px] not-italic text-[#4a5565] text-[16px] top-[7.5px] tracking-[-0.3125px] whitespace-nowrap">Order History</p>
    </div>
  );
}

function Link4() {
  return (
    <div className="bg-[#fff4ed] h-[64px] relative rounded-[4px] shrink-0 w-full" data-name="Link">
      <div aria-hidden="true" className="absolute border border-[#f60] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[24px] left-[8px] not-italic text-[#d08700] text-[16px] top-[7.5px] tracking-[-0.3125px] w-[99px]">{`B2B Credit & BNPL`}</p>
    </div>
  );
}

function Container10() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[16px] h-[392px] items-start left-0 pl-[24px] pr-[25px] pt-[24px] top-0 w-[194.25px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-r border-solid inset-0 pointer-events-none" />
      <Link1 />
      <Link2 />
      <Link3 />
      <Link4 />
    </div>
  );
}

function Heading1() {
  return (
    <div className="h-[37px] relative shrink-0 w-full" data-name="Heading 2">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0.1)] border-b border-solid inset-0 pointer-events-none" />
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[28px] left-0 not-italic text-[#0a0a0a] text-[20px] top-0 tracking-[-0.4492px] whitespace-nowrap">{`B2B Credit & BNPL`}</p>
    </div>
  );
}

function Heading2() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-0 not-italic text-[#1c398e] text-[14px] top-[0.5px] tracking-[-0.1504px] whitespace-nowrap">Total Credit Limit</p>
    </div>
  );
}

function Paragraph7() {
  return (
    <div className="content-stretch flex h-[36px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="flex-[1_0_0] font-['Inter:Bold',sans-serif] font-bold leading-[36px] min-h-px min-w-px not-italic relative text-[#1c398e] text-[30px] tracking-[0.3955px]">$5,000.00</p>
    </div>
  );
}

function Container13() {
  return (
    <div className="bg-[#eff6ff] col-1 justify-self-stretch relative rounded-[10px] row-1 self-stretch shrink-0" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#bedbff] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="content-stretch flex flex-col gap-[8px] items-start pb-px pt-[25px] px-[25px] relative size-full">
        <Heading2 />
        <Paragraph7 />
      </div>
    </div>
  );
}

function Heading3() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-0 not-italic text-[#0d542b] text-[14px] top-[0.5px] tracking-[-0.1504px] whitespace-nowrap">Available Credit</p>
    </div>
  );
}

function Paragraph8() {
  return (
    <div className="content-stretch flex h-[36px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="flex-[1_0_0] font-['Inter:Bold',sans-serif] font-bold leading-[36px] min-h-px min-w-px not-italic relative text-[#0d542b] text-[30px] tracking-[0.3955px]">$2,450.00</p>
    </div>
  );
}

function Container14() {
  return (
    <div className="bg-[#f0fdf4] col-2 justify-self-stretch relative rounded-[10px] row-1 self-stretch shrink-0" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#b9f8cf] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="content-stretch flex flex-col gap-[8px] items-start pb-px pt-[25px] px-[25px] relative size-full">
        <Heading3 />
        <Paragraph8 />
      </div>
    </div>
  );
}

function Container12() {
  return (
    <div className="gap-x-[24px] gap-y-[24px] grid grid-cols-[repeat(2,minmax(0,1fr))] grid-rows-[repeat(1,minmax(0,1fr))] h-[114px] relative shrink-0 w-full" data-name="Container">
      <Container13 />
      <Container14 />
    </div>
  );
}

function Heading4() {
  return (
    <div className="h-[27px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[27px] left-0 not-italic text-[#0a0a0a] text-[18px] top-[0.5px] tracking-[-0.4395px] whitespace-nowrap">CLP Rewards Points</p>
    </div>
  );
}

function Paragraph9() {
  return (
    <div className="h-[32px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[32px] left-0 not-italic text-[#d08700] text-[24px] top-0 tracking-[0.0703px] whitespace-nowrap">12,400 Points</p>
    </div>
  );
}

function Paragraph10() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#6a7282] text-[14px] top-[0.5px] tracking-[-0.1504px] whitespace-nowrap">Equivalent to $124.00 credit</p>
    </div>
  );
}

function Container17() {
  return (
    <div className="h-[52px] relative shrink-0 w-[180.633px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Paragraph9 />
        <Paragraph10 />
      </div>
    </div>
  );
}

function Button4() {
  return (
    <div className="bg-[#f0b100] h-[40px] relative rounded-[8px] shrink-0 w-[92.719px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-[46.5px] not-italic text-[16px] text-center text-white top-[7.5px] tracking-[-0.3125px] whitespace-nowrap">Redeem</p>
      </div>
    </div>
  );
}

function Container16() {
  return (
    <div className="content-stretch flex h-[52px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container17 />
      <Button4 />
    </div>
  );
}

function Container15() {
  return (
    <div className="h-[129px] relative rounded-[10px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="content-stretch flex flex-col gap-[16px] items-start pb-px pt-[17px] px-[17px] relative size-full">
        <Heading4 />
        <Container16 />
      </div>
    </div>
  );
}

function Container11() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[24px] h-[392px] items-start left-[194.25px] pt-[32px] px-[32px] top-0 w-[582.75px]" data-name="Container">
      <Heading1 />
      <Container12 />
      <Container15 />
    </div>
  );
}

function Container9() {
  return (
    <div className="h-[392px] relative shrink-0 w-full" data-name="Container">
      <Container10 />
      <Container11 />
    </div>
  );
}

function Container8() {
  return (
    <div className="bg-white h-[394px] relative rounded-[10px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[10px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)]" />
      <div className="content-stretch flex flex-col items-start p-px relative size-full">
        <Container9 />
      </div>
    </div>
  );
}

function Account1() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] h-[450px] items-start relative shrink-0 w-full" data-name="Account">
      <Heading />
      <Container8 />
    </div>
  );
}

function MainContent() {
  return (
    <div className="absolute bg-[#f9fafb] content-stretch flex flex-col h-[729px] items-start left-0 overflow-clip pt-[24px] px-[32px] top-0 w-[843px]" data-name="Main Content">
      <Account1 />
    </div>
  );
}

function Container7() {
  return (
    <div className="flex-[843_0_0] h-[729px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <MainContent />
      </div>
    </div>
  );
}

function CustomerLayout() {
  return (
    <div className="bg-[#f3f4f6] content-stretch flex h-[729px] items-start overflow-clip relative shrink-0 w-full" data-name="CustomerLayout">
      <Sidebar />
      <Container7 />
    </div>
  );
}

export default function Account() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start relative size-full" data-name="/account">
      <CustomerLayout />
    </div>
  );
}