$(document).ready(function() {
    $('ul.tabs').tabs()
        //Mostrar tab Registro
    $('.regUser').on('click', function() {
        $('ul.tabs').tabs('select_tab', 'tabSingUp');
    })

    $('input:radio[name=tipoUser]').on('click', function() {
        var tipo = $(this).val()
        if (tipo == 'ALUMNOS') {
            $('input[name=sexo]').prop('disabled', false)
            $('#selMaes').prop('disabled', false)
            $('label[for=codConf]').text('Num. Control')
            $('select').material_select();
        } else {
            $('input[name=sexo]').prop('disabled', true)
            $('#selMaes').prop('disabled', true)
            $('label[for=codConf]').text('Token')
            $('select').material_select();
        }
    })

})