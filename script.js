// bio 150 1
// folowers 50 2
// following -50 3
// Repos -150 4

// variables
const search = document.querySelector('.search');
const srhBtn = document.querySelector('.searchBtn');
const avatar = document.querySelector('.avatar-img');
const bioDom = document.querySelector('.infoDis p');
const flwersDom = document.querySelector('.flwersDis p');
const flwinDom = document.querySelector('.flwinDis p');
const reposDom = document.querySelector('.reposDis');
const tabs = document.querySelector('.heading');
const infoSlide = document.querySelectorAll('.display div');
const profDOM = document.querySelector('.profile');






// Profile

class Profile {
    async getProfile(user) {
        try {
            const fetchUser = await fetch(`https://api.github.com/users/${user}`);
            const jsonUser = await fetchUser.json();
            const { avatar_url, bio, followers, following } = jsonUser;
            const data1 = [avatar_url, bio||'Nothing here', followers||'None', following||'None'];
            const fetchRepos = await fetch(`https://api.github.com/users/${user}/repos`);
            const jsonRepos = await fetchRepos.json();
            const data2 = jsonRepos.slice(0, 10).map(repo => [repo.name, repo.url]);
            UI.loadProfile([...data1, [...data2]]);
            UI.showTap();
            return true;
        } catch (error) {
            alert('User does not exist');
            return false;
        }
    }
}






// Ui
class UI {
    static loadProfile(data) {
        avatar.src = data[0];
        bioDom.innerText = data[1];
        flwersDom.innerText = data[2];
        flwinDom.innerText = data[3];
        if (data[4]) {
            reposDom.innerHTML = '';
            data[4].forEach(ele => {
                const rep = document.createElement('a');
                rep.innerText = ele[0];
                rep.href = ele[1];
                reposDom.appendChild(rep);
            });
        } else {
            reposDom.innerText = 'None';
        }
    }

    static showTap() {
        [...tabs.children].forEach(tab => {
            tab.addEventListener('click', (e) => {
                const { target } = e;
                // give box shadow
                target.classList.add('clicked');
                // slide to the right info
                if (target.innerText == 'Followers') {
                    infoSlide.forEach(info => {
                        info.style.transform = `translateX(50%)`;
                    })
                } else if (target.innerText == 'Following') {
                    infoSlide.forEach(info => {
                        info.style.transform = `translateX(-50%)`;
                    })
                } else if (target.innerText == 'Repos') {
                    infoSlide.forEach(info => {
                        info.style.transform = `translateX(-150%)`;
                    })
                } else {
                    infoSlide.forEach(info => {
                        info.style.transform = `translateX(150%)`;
                    })
                }
                // remove box shadow on
                [...tabs.children].forEach(ele => {
                    if (ele.innerText != target.innerText) {
                        ele.classList.remove('clicked');
                    }
                })
            })
        })  
    }

    static showProf() {
        srhBtn.addEventListener('click', () => {
            if (search.value) {
                const profile = new Profile();
                profile.getProfile(search.value).then(response => {
                    if (response) {
                        profDOM.style.transform = 'translateY(0)'
                    }
                }
                );
            } else {
                alert('Please input a username')
            }
        })
    }
}






//Storage
class Storage {

}




// Dom Loaded
document.addEventListener('DOMContentLoaded', () => {
    UI.showProf();
})
