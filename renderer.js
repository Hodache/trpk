const { ipcRenderer, remote, ipcMain } = require('electron');
const bs = require('bootstrap')
const $ = require('jquery');

function updatePublication(data) {
    $('.pub-name').html(data.name)
    $('.pub-author').html(data.author)
    $('.pub-price').html(`${data.price} р.`)
    $('.pub-count').html(makeCountClear(data.count))
    $('.pub-place').html(data.place)
    $('#addButton').data('id', data.id);
}

function makeCountClear(count) {
    return `${count} шт.`
}

function updateAddBtn() {
    const id = $('#addButton').data('id');
    const trs = $(`[data-id=${id}]`);
    if (trs.length > 1) {
        $('#addButton').addClass('d-none');
    } else {
        $('#addButton').removeClass('d-none');
    }
}

// Функция для обновления таблицы с результатами поиска
function updateSearchResults(results) {
    const tableBody = $('#searchResults tbody');
    tableBody.empty();

    results.forEach(result => {
        const row = $(`<tr style="cursor: pointer;" data-id="${result.id}"></tr>`);
        row.html(`
        <td>${result.name}</td>
        <td>${result.author}</td>
        <td>${result.genre}</td>
      `);
        tableBody.append(row);

        // Обработчик события для открытия страницы книги
        row.click(function (event) {
            event.preventDefault();
            const bookId = $(this).data('id');

            $.get('http://localhost:3000/book', { id: bookId }, function (response) {
                if (response[0].count > 0) {
                    $('#openFormBtn').addClass('d-none')
                } else {
                    $('#openFormBtn').removeClass('d-none')
                    response[0].place = 'нет'
                }

                updatePublication(response[0]);
                $("tr").removeClass("table-info")
                row.addClass("table-info")

                updateAddBtn()
            });
        });
    });
}

// Обработчик события отправки формы поиска
$('#searchForm').submit(function (event) {
    event.preventDefault();

    const searchQuery = $('#searchInput').val();

    if (searchQuery.length == 0) {
        alert("Введите хотя-бы часть названия")
        return
    }

    $.get('http://localhost:3000/books', { name: searchQuery }, function (response) {
        // Обновляем список на странице
        updateSearchResults(response);
    });
});

// Обработчик события для кнопки "Добавить"
$('#addButton').click(function () {
    const id = $(this).data('id')

    const name = $('.pub-name').html()
    const count = $('.pub-count').html()
    const place = $('.pub-place').html()

    const row = $(`<tr style="cursor: pointer;" data-id="${id}"></tr>`);
    row.html(`
        <td>${name}</td>
        <td>${count}</td>
        <td>${place}</td>
      `);
    $('#savedEditions tbody').append(row);
    updateAddBtn()

    row.click(function (event) {
        event.preventDefault();
        const bookId = $(this).data('id');

        $.get('http://localhost:3000/book', { id: bookId }, function (response) {
            if (response[0].count > 0) {
                $('#openFormBtn').addClass('d-none')
            } else {
                $('#openFormBtn').removeClass('d-none')
                response[0].place = 'нет'
            }

            updatePublication(response[0]);
            $("tr").removeClass("table-info")
            row.addClass("table-info")

            updateAddBtn()
        });
    });
});

// Обработчик события для кнопки "Очистить"
$('#clearButton').click(function () {
    $('#savedEditions tbody').empty();
    updateAddBtn()
});

// Обработка отправки формы
$('#requestForm').on('submit', function (event) {
    event.preventDefault();

    const pid = $('#addButton').data('id')
    const name = $(this).find('#name').val()
    const email = $(this).find('#email').val()
    const phone = $(this).find('#phone').val()

    $.post('http://localhost:3000/newreq', { pid: pid, name: name, email: email, phone: phone }, function (response) {
        alert(`Заявка №${response[0].id} успешно создана!`)
    })
});

module.exports = makeCountClear