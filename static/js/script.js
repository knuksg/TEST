function init() {
    window.scroll({
        top: 0
    })
    setHTMLEventHandler();
}


const sections = document.querySelectorAll('.bg_wrap')
const menuBtns = document.querySelectorAll('.btn')
const menuImages = document.querySelectorAll(".menu-img")
const menuBtnsMobile = document.querySelectorAll(".btn_mobile")
const hamburgerBtn = document.querySelector(".hamburger")
const navBtn = document.querySelector(".nav")
const cancelBtn = document.querySelector(".cancel")
const characterTabBtns = document.querySelectorAll('.tab')
const explainCard = document.querySelector(".explain_card")

function setHTMLEventHandler() {
    menuBtns.forEach((item, index) => {
        item.onclick = () => {
            menuImages.forEach((image) => {
                console.log(image)
                if (item.childNodes[1] === image) {
                    if (!image.src.includes("-on")) {
                        image.src = `static/i${image.src.slice(30,-8)}-on.png`
                    }
                } else {

                    if (!image.src.includes("-on")) {
                        image.src = `static/i${image.src.slice(30,-8)}-off.png`

                    } else {
                        image.src = `static/i${image.src.slice(30,-7)}-off.png`
                    }
                }
            })


            window.scroll({
                top: sections[index].offsetTop,
                behavior: 'smooth'
            })
        }
    })
    menuBtnsMobile.forEach((item, index) => {
        item.onclick = () => {
            window.scroll({
                top: sections[index].offsetTop,
                behavior: 'smooth'
            })
            hamburgerBtn.className = hamburgerBtn.className.replace('show', '')
            hamburgerBtn.style.display = "none"
        }
    })

    characterTabBtns.forEach((item) => {
        item.onclick = () => {
            const current = document.querySelector('.selected')
            const charImage = document.querySelector(".char_image")
            const charExplain = document.querySelector(".explain_card")
            current.className = current.className.replace("selected", " ");
            charImage.style.backgroundImage = `url("static/img/character/${item.classList[1]}.png")`;
            item.classList += ' selected'
            charExplain.style.backgroundImage = `url("static/img/character/${item.classList[1]}_card.png")`;
            console.log(explainCard);
            switch (
                item.childNodes[1].getAttribute('alt')
            ) {
                case 'dindin':
                    explainCard.innerHTML = "<span class='char_name '>딘딘</span><span class='explain_text '>고독한 여행자, 딘딘(Dindin).<br>딘딘은 이 게임의 주인공인 모험가입니다. 늑대과의 내향적인 이상주의자입니다. 그리고 해피리움을 지키는 수호자이기도 합니다.<br>드랍테일 일당이 해피리움에 들이 닥치고 샤이닝스톤을 훔쳐 달아난 것을 뒤늦게 알게 되었습니다.<br>딘딘은 타격을 사용하는것을 좋아합니다. 주 특기는 패시브인 공수교대를 활용하여 적에게 강력한 일격을 가하는 것입니다.</span>"
                    break;

                case 'snow':
                    explainCard.innerHTML = "<span class='char_name '>스노우</span><span class='explain_text '>깊은 겨울, 북극 여우 스노우(Snow).<br>스노우는 도도한 캐릭터입니다. 냉혹한 파괴자이기도합니다.시원하고 상쾌한 북극의 강한 공기를 가르며 몬스터에게 일격을 가합니다.딘딘의 두번째 친구로서 헤피리움의 평화를 지켜냅니다.스노우는 스킬을 쓰는것을 좋아합니다. 써클 마법의 정통을 느껴보세요!</span>"
                    break;
                case 'donpy':
                    explainCard.innerHTML = "<span class='char_name '>돈피</span><span class='explain_text '>충성심 킹, 돈피(Donpy)!<br>돈피는 힘이 센, 강력한 용사입니다.하지만 의외로 조용한 성격의 소유자입니다.주변을 잘 살피고 친근하기까지 합니다. 주변을 살피고 정돈을 잘합니다.항상 진솔하고 관계에 충실한 돈피!충성심 강한 돈피는 방패를 주무기로 장착합니다. 강력한 방패의 힘으로 높은 레벨의 몬스터들의 도전을 막아냅니다!</span>"
                    break;
                default:
                    break;
            }

        }
    })

    navBtn.onclick = () => {
        hamburgerBtn.classList += ' show';
        hamburgerBtn.style.display = "flex"
    }
    cancelBtn.onclick = () => {
        hamburgerBtn.className = hamburgerBtn.className.replace('show', '')
        hamburgerBtn.style.display = "none"
    }
}
init()