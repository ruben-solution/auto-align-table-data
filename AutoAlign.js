var AutoAlign = (function () {
    function getCols($table) {
        var table_col_data = {};
        var $rows = $($table).find('tr');

        if ($rows.length > 0) {
            var $column_count = $($rows[0]).find('td, th').length;

            for (var i = 0; i < $column_count; i++) {
                if (!(i in table_col_data)) {
                    table_col_data[i] = [];
                }

                $.each($rows, function (k, v) {
                    var $tds = $(v).find('td');

                    if ($tds.length > 0) {
                        table_col_data[i].push($($tds[i]).text());
                    }
                });
            }
        }

        return table_col_data;
    }

    function detectDataType($table) {
        var col_data_types = {};
        $cols = getCols($table);

        for (var col_id = 0; col_id < Object.keys($cols).length; col_id++) {
            var numeric = true;

            for (var field_id = 0; field_id < $cols[col_id].length; field_id++) {
                if (!U.isNumeric($cols[col_id][field_id].trim())) {
                    numeric = false;
                    break;
                }
            }

            col_data_types[col_id] = numeric;
        }

        return col_data_types;
    }

    function alignTableCols($table) {
        var data_types = detectDataType($table);

        Object.entries(data_types).forEach(entry => {
            let key = entry[0];
            let value = entry[1];

            if (value === true) {
                $rows = $($table).find('tr');

                for (var i = 0; i < $rows.length; i++) {
                    $($rows[i]).find('td:nth-child(' + (parseInt(key) + 1) + 'n)').css('text-align', 'right');
                }
            }
        });
    }

    return {
        init: function (cls) {
            var $tables = $('table.' + cls);

            for (var a = 0; a < $tables.length; a++) {
                alignTableCols($tables[a]);
            }
        }
    };
})();
