import svgPaths from "./svg-0qb802618t";
import imgImageValu from "figma:asset/dd263ea74eea751edbe19c75046ad4c686cd593c.png";

function Heading() {
  return (
    <div className="content-stretch flex h-[36px] items-start relative shrink-0 w-[768px]" data-name="Heading 1">
      <p className="flex-[1_0_0] font-['Inter:Bold',sans-serif] font-bold leading-[36px] min-h-px min-w-px not-italic relative text-[#3b3a9f] text-[30px] tracking-[0.3955px]">Logistics Command Center</p>
    </div>
  );
}

function Link() {
  return (
    <div className="h-[34px] relative shrink-0 w-[117.672px]" data-name="Link">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-0 not-italic text-[16px] text-white top-[-0.5px] tracking-[-0.3125px] whitespace-nowrap">Hub Collections</p>
      </div>
    </div>
  );
}

function Link1() {
  return (
    <div className="h-[34px] relative shrink-0 w-[134.375px]" data-name="Link">
      <div aria-hidden="true" className="absolute border-[#333] border-b-2 border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-0 not-italic text-[#333] text-[16px] top-[-0.5px] tracking-[-0.3125px] whitespace-nowrap">Heartland Routing</p>
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="absolute bg-[#ff6900] content-stretch flex gap-[16px] h-[67px] items-start left-px pb-px pl-[24px] pt-[16px] top-px w-[777px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#364153] border-b border-solid inset-0 pointer-events-none" />
      <Link />
      <Link1 />
    </div>
  );
}

function Heading1() {
  return (
    <div className="h-[27px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[27px] left-0 not-italic text-[#333] text-[18px] top-[0.5px] tracking-[-0.4395px] whitespace-nowrap">Heartland Store Routing (24-48hr Dispatch)</p>
    </div>
  );
}

function Heading2() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Heading 4">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[24px] left-0 not-italic text-[#333] text-[16px] top-[-0.5px] tracking-[-0.3125px] whitespace-nowrap">North Zone</p>
    </div>
  );
}

function Icon() {
  return (
    <div className="absolute left-0 size-[16px] top-[3.31px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p14548f00} id="Vector" stroke="var(--stroke-0, #333333)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p17781bc0} id="Vector_2" stroke="var(--stroke-0, #333333)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Paragraph">
      <Icon />
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[20px] not-italic text-[#333] text-[14px] top-[0.5px] tracking-[-0.1504px] whitespace-nowrap">Valu$ AMK Hub</p>
    </div>
  );
}

function Container6() {
  return (
    <div className="h-[48px] relative shrink-0 w-[120.977px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start relative size-full">
        <Heading2 />
        <Paragraph />
      </div>
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="absolute h-[16px] left-0 top-[32px] w-[82.219px]" data-name="Paragraph">
      <p className="-translate-x-full absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-[83px] not-italic text-[#99a1af] text-[12px] text-right top-px whitespace-nowrap">orders queued</p>
    </div>
  );
}

function Container7() {
  return (
    <div className="h-[48px] relative shrink-0 w-[82.219px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-full absolute font-['Inter:Bold',sans-serif] font-bold leading-[32px] left-[82.38px] not-italic text-[#fdc700] text-[24px] text-right top-[-1px] tracking-[0.0703px] whitespace-nowrap">8</p>
        <Paragraph1 />
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex h-[48px] items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Container6 />
      <Container7 />
    </div>
  );
}

function Button() {
  return (
    <div className="bg-[#ff6900] h-[36px] relative rounded-[8px] shrink-0 w-full" data-name="Button">
      <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[348.18px] not-italic text-[14px] text-center text-white top-[8.5px] tracking-[-0.1504px] whitespace-nowrap">Generate Dispatch Manifest</p>
    </div>
  );
}

function Container4() {
  return (
    <div className="bg-white h-[130px] relative rounded-[10px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#fee2e2] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="content-stretch flex flex-col gap-[12px] items-start pb-px pt-[17px] px-[17px] relative size-full">
        <Container5 />
        <Button />
      </div>
    </div>
  );
}

function Heading3() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Heading 4">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[24px] left-0 not-italic text-[#333] text-[16px] top-[-0.5px] tracking-[-0.3125px] whitespace-nowrap">East Zone</p>
    </div>
  );
}

function Icon1() {
  return (
    <div className="absolute left-0 size-[16px] top-[3.31px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p14548f00} id="Vector" stroke="var(--stroke-0, #333333)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p17781bc0} id="Vector_2" stroke="var(--stroke-0, #333333)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Paragraph">
      <Icon1 />
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[20px] not-italic text-[#333] text-[14px] top-[0.5px] tracking-[-0.1504px] whitespace-nowrap">Valu$ Bedok Mall</p>
    </div>
  );
}

function Container10() {
  return (
    <div className="h-[48px] relative shrink-0 w-[131.188px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start relative size-full">
        <Heading3 />
        <Paragraph2 />
      </div>
    </div>
  );
}

function Paragraph3() {
  return (
    <div className="absolute h-[16px] left-0 top-[32px] w-[82.219px]" data-name="Paragraph">
      <p className="-translate-x-full absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-[83px] not-italic text-[#99a1af] text-[12px] text-right top-px whitespace-nowrap">orders queued</p>
    </div>
  );
}

function Container11() {
  return (
    <div className="h-[48px] relative shrink-0 w-[82.219px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-full absolute font-['Inter:Bold',sans-serif] font-bold leading-[32px] left-[82.98px] not-italic text-[#16a34a] text-[24px] text-right top-[-1px] tracking-[0.0703px] whitespace-nowrap">5</p>
        <Paragraph3 />
      </div>
    </div>
  );
}

function Container9() {
  return (
    <div className="content-stretch flex h-[48px] items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Container10 />
      <Container11 />
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-[#ff6900] h-[36px] relative rounded-[8px] shrink-0 w-full" data-name="Button">
      <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[348.18px] not-italic text-[14px] text-center text-white top-[8.5px] tracking-[-0.1504px] whitespace-nowrap">Generate Dispatch Manifest</p>
    </div>
  );
}

function Container8() {
  return (
    <div className="bg-white h-[130px] relative rounded-[10px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#fee2e2] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="content-stretch flex flex-col gap-[12px] items-start pb-px pt-[17px] px-[17px] relative size-full">
        <Container9 />
        <Button1 />
      </div>
    </div>
  );
}

function Heading4() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Heading 4">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[24px] left-0 not-italic text-[#e65400] text-[16px] top-[-0.5px] tracking-[-0.3125px] whitespace-nowrap">West Zone</p>
    </div>
  );
}

function Icon2() {
  return (
    <div className="absolute left-0 size-[16px] top-[3.31px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p14548f00} id="Vector" stroke="var(--stroke-0, #E65400)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p17781bc0} id="Vector_2" stroke="var(--stroke-0, #E65400)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Paragraph4() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Paragraph">
      <Icon2 />
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[20px] not-italic text-[#e65400] text-[14px] top-[0.5px] tracking-[-0.1504px] whitespace-nowrap">Valu$ Jurong Point</p>
    </div>
  );
}

function Container14() {
  return (
    <div className="h-[48px] relative shrink-0 w-[141.648px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start relative size-full">
        <Heading4 />
        <Paragraph4 />
      </div>
    </div>
  );
}

function Paragraph5() {
  return (
    <div className="absolute h-[16px] left-0 top-[32px] w-[82.219px]" data-name="Paragraph">
      <p className="-translate-x-full absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-[83px] not-italic text-[#99a1af] text-[12px] text-right top-px whitespace-nowrap">orders queued</p>
    </div>
  );
}

function Container15() {
  return (
    <div className="h-[48px] relative shrink-0 w-[82.219px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-full absolute font-['Inter:Bold',sans-serif] font-bold leading-[32px] left-[82.55px] not-italic text-[#e65400] text-[24px] text-right top-[-1px] tracking-[0.0703px] whitespace-nowrap">10</p>
        <Paragraph5 />
      </div>
    </div>
  );
}

function Container13() {
  return (
    <div className="content-stretch flex h-[48px] items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Container14 />
      <Container15 />
    </div>
  );
}

function Button2() {
  return (
    <div className="bg-[#ff6900] h-[36px] relative rounded-[8px] shrink-0 w-full" data-name="Button">
      <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[348.18px] not-italic text-[14px] text-center text-white top-[8.5px] tracking-[-0.1504px] whitespace-nowrap">Generate Dispatch Manifest</p>
    </div>
  );
}

function Container12() {
  return (
    <div className="bg-white h-[130px] relative rounded-[10px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#fee2e2] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="content-stretch flex flex-col gap-[12px] items-start pb-px pt-[17px] px-[17px] relative size-full">
        <Container13 />
        <Button2 />
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[16px] h-[465px] items-start left-[25px] top-[92px] w-[729px]" data-name="Container">
      <Heading1 />
      <Container4 />
      <Container8 />
      <Container12 />
    </div>
  );
}

function Container1() {
  return (
    <div className="bg-white h-[582px] relative rounded-[10px] shrink-0 w-full" data-name="Container">
      <div className="overflow-clip relative rounded-[inherit] size-full">
        <Container2 />
        <Container3 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#fee2e2] border-solid inset-0 pointer-events-none rounded-[10px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function AdminOrders() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[24px] h-[660px] items-start left-[12px] top-[35px] w-[779px]" data-name="AdminOrders">
      <Heading />
      <Container1 />
    </div>
  );
}

function Container() {
  return (
    <div className="absolute h-[729px] left-0 overflow-clip top-0 w-[826px]" data-name="Container">
      <AdminOrders />
    </div>
  );
}

function MainContent() {
  return (
    <div className="absolute bg-[#f9f4ea] h-[729px] left-[272px] top-[8px] w-[826px]" data-name="Main Content">
      <Container />
    </div>
  );
}

function ImageValu() {
  return (
    <div className="h-[31.993px] relative rounded-[8px] shrink-0 w-[39.678px]" data-name="Image (Valu$)">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[8px]">
        <div className="absolute bg-white inset-0 rounded-[8px]" />
        <img alt="" className="absolute max-w-none object-cover rounded-[8px] size-full" src={imgImageValu} />
      </div>
    </div>
  );
}

function Background() {
  return (
    <div className="bg-[#f26522] relative rounded-[8px] shrink-0 size-[32px]" data-name="Background">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <ImageValu />
      </div>
    </div>
  );
}

function Container16() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative">
        <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-white whitespace-nowrap">
          <p className="leading-[normal]">Valu$ Wholesale</p>
        </div>
      </div>
    </div>
  );
}

function HorizontalBorder() {
  return (
    <div className="absolute bg-[#ff6900] content-stretch flex gap-[12px] items-center left-0 pb-[25px] pt-[24px] px-[24px] top-0 w-[255px]" data-name="HorizontalBorder">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-b border-solid inset-0 pointer-events-none" />
      <Background />
      <Container16 />
    </div>
  );
}

function Icon3() {
  return (
    <div className="absolute left-0 size-[31.997px] top-0" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 31.9965 31.9965">
        <g clipPath="url(#clip0_36_1451)" id="Icon">
          <path d={svgPaths.p24aaca80} fill="var(--fill-0, #D1D5DC)" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_36_1451">
            <rect fill="white" height="31.9965" width="31.9965" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text() {
  return (
    <div className="absolute bg-[#f3f4f6] left-0 overflow-clip rounded-[18641400px] size-[31.997px] top-0" data-name="Text">
      <Icon3 />
    </div>
  );
}

function Paragraph6() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-0 not-italic text-[#364153] text-[14px] top-[0.67px] tracking-[-0.1504px] whitespace-nowrap">Mama Shop #493</p>
    </div>
  );
}

function Paragraph7() {
  return (
    <div className="h-[15.99px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[16px] left-0 not-italic text-[#155dfc] text-[12px] top-[0.56px] whitespace-nowrap">Trade Prime</p>
    </div>
  );
}

function Container19() {
  return (
    <div className="absolute content-stretch flex flex-col h-[35.99px] items-start left-[43.99px] top-[1.11px] w-[116.988px]" data-name="Container">
      <Paragraph6 />
      <Paragraph7 />
    </div>
  );
}

function Container18() {
  return (
    <div className="h-[38.212px] relative shrink-0 w-full" data-name="Container">
      <Text />
      <Container19 />
    </div>
  );
}

function Icon4() {
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

function Link2() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Link">
      <Icon4 />
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[32px] not-italic text-[#4a5565] text-[14px] top-[0.67px] tracking-[-0.1504px] whitespace-nowrap">Sign Out</p>
    </div>
  );
}

function Container17() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[15.998px] h-[106.762px] items-start left-[9px] pt-[16.554px] px-[15.998px] top-[645px] w-[255.443px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-solid border-t-[0.556px] inset-0 pointer-events-none" />
      <Container18 />
      <Link2 />
    </div>
  );
}

function Icon5() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p3a614480} id="Vector" stroke="var(--stroke-0, #98A2B3)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p2625e600} id="Vector_2" stroke="var(--stroke-0, #98A2B3)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p2b357440} id="Vector_3" stroke="var(--stroke-0, #98A2B3)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Text1() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-[11.99px] size-[20px] top-[10px]" data-name="Text">
      <Icon5 />
    </div>
  );
}

function Link3() {
  return (
    <div className="absolute h-[40px] left-[11.99px] rounded-[8px] top-[18px] w-[246.838px]" data-name="Link">
      <Text1 />
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] left-[43.97px] not-italic text-[#4a5565] text-[16px] top-[11.18px] whitespace-nowrap">{` Catalog `}</p>
    </div>
  );
}

function Icon6() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_36_1434)" id="Icon">
          <path d="M10 1.66667V18.3333" id="Vector" stroke="var(--stroke-0, #98A2B3)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.pd2b5398} id="Vector_2" stroke="var(--stroke-0, #98A2B3)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d="M10 1.66667V4.16667" id="Vector_3" stroke="var(--stroke-0, #98A2B3)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d="M10 15.8333V18.3333" id="Vector_4" stroke="var(--stroke-0, #98A2B3)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
        <defs>
          <clipPath id="clip0_36_1434">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text2() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-[11.99px] size-[20px] top-[10px]" data-name="Text">
      <Icon6 />
    </div>
  );
}

function Link4() {
  return (
    <div className="absolute h-[40px] left-[11.99px] rounded-[8px] top-[61.99px] w-[246.838px]" data-name="Link">
      <Text2 />
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] left-[43.97px] not-italic text-[#4a5565] text-[16px] top-[11.18px] whitespace-nowrap">{` Pricing Configuration `}</p>
    </div>
  );
}

function Icon7() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d="M2.5 2.5V17.5H17.5" id="Vector" stroke="var(--stroke-0, #98A2B3)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p30396a80} id="Vector_2" stroke="var(--stroke-0, #98A2B3)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Text3() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-[11.99px] size-[20px] top-[10px]" data-name="Text">
      <Icon7 />
    </div>
  );
}

function Link5() {
  return (
    <div className="absolute h-[40px] left-[12px] rounded-[8px] top-[106px] w-[231px]" data-name="Link">
      <Text3 />
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] left-[43.97px] not-italic text-[#4a5565] text-[16px] top-[11.18px] whitespace-pre">{` AI  Forecasting `}</p>
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_0px_0px_0px_rgba(255,127,42,0.12)]" />
    </div>
  );
}

function Icon8() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p4a08d00} id="Vector" stroke="var(--stroke-0, #F06C10)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p27c81900} id="Vector_2" stroke="var(--stroke-0, #F06C10)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.pcf90300} id="Vector_3" stroke="var(--stroke-0, #F06C10)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d="M5 9.16667V10.8333H10" id="Vector_4" stroke="var(--stroke-0, #F06C10)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d="M15 9.16667V10.8333H10" id="Vector_5" stroke="var(--stroke-0, #F06C10)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Text4() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-[12.01px] size-[20px] top-[10.04px]" data-name="Text">
      <Icon8 />
    </div>
  );
}

function Link6() {
  return (
    <div className="absolute bg-[#fff7ed] h-[40px] left-[12px] rounded-[8px] top-[150px] w-[231px]" data-name="Link">
      <Text4 />
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] left-[43.97px] not-italic text-[#ca3500] text-[16px] top-[10px] w-[153px]">{` Logistics Center `}</p>
    </div>
  );
}

function Icon9() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p393aa080} id="Vector" stroke="var(--stroke-0, #98A2B3)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d="M5 5L4.16667 2.5H1.66667" id="Vector_2" stroke="var(--stroke-0, #98A2B3)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p2036c1f0} id="Vector_3" stroke="var(--stroke-0, #98A2B3)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p201e33c0} id="Vector_4" stroke="var(--stroke-0, #98A2B3)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Text5() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-[11.99px] size-[20px] top-[10px]" data-name="Text">
      <Icon9 />
    </div>
  );
}

function Link7() {
  return (
    <div className="absolute h-[40px] left-[9px] rounded-[8px] top-[194px] w-[246.838px]" data-name="Link">
      <Text5 />
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] left-[43.97px] not-italic text-[#4a5565] text-[16px] top-[11.18px] whitespace-nowrap">{` Shop Orders `}</p>
    </div>
  );
}

function Navigation() {
  return (
    <div className="absolute h-[267px] left-0 top-[81px] w-[243px]" data-name="Navigation">
      <Link3 />
      <Link4 />
      <Link5 />
      <Link6 />
      <Link7 />
    </div>
  );
}

function Container20() {
  return <div className="absolute h-[752px] left-[-1px] top-0 w-[256px]" data-name="Container" />;
}

function Sidebar() {
  return (
    <div className="absolute bg-white border-[rgba(59,58,159,0.12)] border-r border-solid h-[754px] left-[17px] top-[8px] w-[255px]" data-name="Sidebar">
      <HorizontalBorder />
      <Container17 />
      <Navigation />
      <Container20 />
    </div>
  );
}

export default function AdminLogisticsHeartlandRouting() {
  return (
    <div className="bg-[#e6e6e6] relative size-full" data-name="/admin/logistics/heartland-routing">
      <MainContent />
      <Sidebar />
    </div>
  );
}