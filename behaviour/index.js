let current_index = 0;
let sections = document.getElementsByClassName("sec")
let last_index = sections.length-1
class GlobalScript {
    init(){
        // get all section and initialize index


        // adjust avatar when window size change
        window.addEventListener("resize", this.update);
        this.update()


        // add event listener to nav cross button
        let nav_cross_button = document.getElementById('cross_button')
        let nav_collapsible_button = document.getElementById('collapsible_menu')
        let nav_menu_container = document.getElementById('menu_container')
        nav_cross_button.addEventListener("click", (e)=>{
            e.stopPropagation()
            nav_menu_container.classList.remove('active')
        })
        nav_collapsible_button.addEventListener("click", (e)=>{
            nav_menu_container.classList.add('active')
        })

        let is_running = false
        // smooth scroll when wheel up/down.
        document.addEventListener("wheel", (e)=>{
            if(is_running === false){
                this.smooth_scroll(e.deltaY)
            }
            is_running = true
            window.setTimeout(()=>{
                is_running = false
            }, 500)
        })
        // scroll intro section into view before un-reload page
        window.onbeforeunload = function(){
            document.querySelector('.intro_section.sec').scrollIntoView()
        }
    }
    update(){
        if(window.innerWidth<=600){
            return
        }
        let avatar = document.getElementById('avatar')
        let avatarRect = avatar.getClientRects()[0]
        let first_half = document.getElementById('first_half')
        let first_half_rect = first_half.getClientRects()[0]
        avatar.style.top = `${(first_half_rect.height/2)-(avatarRect.height/2)+10}px`
        avatar.style.left = `${first_half_rect.right-((avatarRect.width)/2)+10}px`
    }
    smooth_scroll(delta){
        let elm;
        if (delta > 0) {
            if (current_index >= last_index) {
                return
            }
            elm = sections[current_index + 1]
            elm.scrollIntoView({behavior: "smooth", block: "center"})
            current_index += 1
        } else {
            if (current_index <= 0) {
                return
            }
            elm = sections[current_index - 1]
            elm.scrollIntoView({behavior: "smooth", block: "center"})
            current_index -= 1
        }
    }
}
global = new GlobalScript()
global.init()



