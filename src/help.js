import React from 'react'
import * as bs from 'react-bootstrap'


function Help(props) {
    return (
        <bs.Container fluid className="p-">
            <bs.Row noGutters style={{ padding: "6rem 0" }}>
                <bs.Col>
                    
                    <div className="text-center mt-5">
                        {/* <img src= alt= className='rounded-circle shadow-lg' /> */}
                    </div>

                    <h1 className="text-center mt-5">Need some help?</h1>
                    <p>繼成立B2B網上交易平台阿里巴巴後，阿里巴巴集團於2003年5月投資1億元人民幣建立網上購物平台淘寶網。
                        2004年10月，阿里巴巴集團投資成立支付寶，面向中國電子商務市場推出第三方擔保交易服務。
                        2005年8月，阿里巴巴集團與雅虎達成全面合作關係，阿里巴巴集團全部收購雅虎中國資產，包括旗下的一搜、3721，雅虎美國獲得新阿里巴巴集團的40%股份。
                        2007年8月，阿里巴巴集團推出廣告交易平台阿里妈妈，以支付的低端門槛吸引了大量的中小站長加入。2007年11月，旗下B2B公司阿里巴巴網絡以港幣13.5元在香港掛牌，曾經由高點時的每股41.8港元（2007年11月）跌至2008年10月的3.46港幣，低點時股價不足最高點時的9%。
                        2009年9月，阿里巴巴集團慶祝創立十週年，同時宣布成立另一家子公司阿里雲計算。公司创始人“阿里巴巴十八罗汉”(分别是马云、张勇、张瑛、孙彤宇、金建杭、蔡崇信、彭蕾、吴泳铭、盛一飞、楼文胜、麻长炜、韩敏、谢世煌、戴珊、金媛影、蒋芳、师昱峰、饶彤彤)宣布辞去创始人职位，公司改为合伙人制度。
                        2011年6月，阿里巴巴集團將淘寶網分拆為三個獨立的公司：淘寶網、淘寶商城（后更名为天猫）和一淘，以更精準和有效的服務中國的網購人群。
                    </p>
                </bs.Col>
            </bs.Row>
        </bs.Container>
    );
}

export default Help;
