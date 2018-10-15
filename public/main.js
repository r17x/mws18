const redirectTo = to => {
    window.location = `${window.location.origin}/${to}`;
}

const content = document.getElementById('content');

const header = document.createElement('header');

const title = document.createElement('h1');

title.id = 'home';

title.addEventListener('click', () => redirectTo(''));;

title.innerHTML = 'MWS 2018';

const author = document.createElement('span');

author.id = 'author';

author.innerHTML = 'R AdySurya A';

header.appendChild(title);

header.appendChild(author);

document.body.insertBefore(header, content);

const font = document.createElement('link');

font.href = "https://fonts.googleapis.com/css?family=Chakra+Petch";
font.rel = 'preload';
font.as = 'style';

document.head.appendChild(font);

font.rel = "stylesheet";
font.defer = true;
delete font.as;

document.head.appendChild(font);
