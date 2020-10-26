// Part List parser by Nathan Choi

(function() {
    const circle = '<i style="color: #F4F4F4" class="fa fa-circle fa-stack-2x"></i>';
    const star = '<i style="color: #FFCC00; margin-left: 5px" class="fas fa-star"></i>';

    // Budget, Performance, Enthusiast
    const icons = [
        "<i style='color: #00D455' class='fas fa-stack-1x fa-dollar-sign'></i>",
        "<i style='color: #FFCC00' class='fas fa-stack-1x fa-bolt'></i>",
        "<i style='color: #FF5555' class='fas fa-stack-1x fa-gem'></i>"
    ];

    fetch("https://raw.githubusercontent.com/millspcclub/millspcwebsite/master/clubdata/partlists.json")
        .then(response => response.json())
        .then(data => {
            for (const partlist of data.lists) {
                if (partlist.featured) {
                    var innerCard = $("<div class='inner'></div>")

                    var card = $("<card></card.text>")
                        .append(`<span class="fa-stack fa-2x">${circle + icons[partlist.type]}</span>`)
                        .append(
                            $('<div class="full-row"></div>')
                            .append(`<h3>${partlist.name}</h3>`)
                            .append(`<div class="price">$${partlist.price}</div>`)
                        )
                        .append(
                            innerCard
                            .append(
                                $('<div class="full-row fullest"></div>')
                                .append(
                                    $("<div class='vert'></div>")
                                    .append("<span class='label'>Processor</span>")
                                    .append(`<span class='model'>${partlist.cpu}</span>`)
                                )
                                .append(`<span class="stars">${star.repeat([data.ratings[partlist.cpu]])}</span>`)
                            )
                            .append(
                                $('<div class="full-row fullest"></div>')
                                .append(
                                    $("<div class='vert'></div>")
                                    .append("<span class='label'>Graphics</span>")
                                    .append(`<span class='model'>${partlist.gpu}</span>`)
                                )
                                .append(`<span class="stars">${star.repeat([data.ratings[partlist.gpu]])}</span>`)
                            )
                            .append(
                                $('<div class="full-row fullest"></div>')
                                .append(
                                    $("<div class='vert'></div>")
                                    .append("<span class='label'>Memory</span>")
                                    .append(`<span class='model'>${partlist.ram.model}</span>`)
                                )
                                .append(`<span class='ram-size'>${partlist.ram.amount}GB</span>`)
                            )
                        )

                    const link = $(`<a class="card-link" style="color: inherit" href="https://pcpartpicker.com${partlist.relURL}"></a>`)
                        .append(card);

                    $("#home-partlist").append(link);
                }
            }

            if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                $(".card-link").tilt({
                    scale: 1.05
                });
            }
        })
}());