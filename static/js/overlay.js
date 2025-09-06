(function () {
            const overlay = document.getElementById('imgOverlay');
            const overlayImg = document.getElementById('overlayImg');
            const caption = document.getElementById('overlayCaption');
            const thumbs = Array.from(document.querySelectorAll('.screens .shots img'));
            let idx = 0;

            // закачаме кликовете по миниатюрите
            thumbs.forEach((img, i) => {
                img.addEventListener('click', () => openOverlay(i));
            });

            function update() {
                const img = thumbs[idx];
                overlayImg.src = img.src;
                overlayImg.alt = img.alt || '';
                caption.textContent = img.alt || '';
            }

            window.openOverlay = function (i) {
                idx = i;
                update();
                overlay.classList.add('open');
                overlay.setAttribute('aria-hidden', 'false');
                document.body.style.overflow = 'hidden';
                overlay.addEventListener('click', backdropClose);
                document.addEventListener('keydown', keyHandler);
            };

            window.closeOverlay = function () {
                overlay.classList.remove('open');
                overlay.setAttribute('aria-hidden', 'true');
                document.body.style.overflow = '';
                overlay.removeEventListener('click', backdropClose);
                document.removeEventListener('keydown', keyHandler);
            };

            window.navOverlay = function (step) {
                idx = (idx + step + thumbs.length) % thumbs.length;
                update();
            };

            function backdropClose(e) {
                if (!e.target.closest('.overlay-content, .nav, .close')) closeOverlay();
            }

            function keyHandler(e) {
                if (e.key === 'Escape') closeOverlay();
                else if (e.key === 'ArrowRight') navOverlay(1);
                else if (e.key === 'ArrowLeft') navOverlay(-1);
            }
        })();