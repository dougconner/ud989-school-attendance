/* STUDENTS IGNORE THIS FUNCTION
 * All this does is create an initial
 * attendance record if one is not found
 * within localStorage.
 */
// (function() {
//     if (!localStorage.attendance) {
//         console.log('Creating attendance records...');
//         function getRandom() {
//             return (Math.random() >= 0.5);
//         }

//         var nameColumns = $('tbody .name-col'),
//             attendance = {};

//         nameColumns.each(function() {
//             var name = this.innerText;
//             attendance[name] = [];

//             for (var i = 0; i <= 11; i++) {
//                 attendance[name].push(getRandom());
//             }
//         });

//         localStorage.attendance = JSON.stringify(attendance);
//     }
// }());


/* STUDENT APPLICATION */
$(function() {
    var attendance = JSON.parse(localStorage.attendance),
        // Table body column elements containing the total days missed
        $allMissed = $('tbody .missed-col'),
        // Table body columns elements containing all the attendance checkboxes
        $allCheckboxes = $('tbody input');

    // Model
    // Load the allMissed data into an array of objects.
    // [index], name, daysMissed[], numMissed
    // Write data to storage when data changes

    var model = {
        students: [
            {
                name: 'first student',
                // 0 = attended class, 1 = absent
                attendance: [0, 1, 0, 0]
            },
            {
                name: 'second student',
                attendance: [1, 0, 0, 1]
            },
           {
                name: 'third student',
                attendance: [0, 1, 0, 0]
            }
         ],
         // Add model methods here
         getData: function() {
            var studentData = [];
            this.students.forEach(function(element, index, array) {
                var student = {};
                student.index = index;
                student.name = array[index].name;
                student.daysMissed = 0;
                student.attendance = array[index].attendance;
                for (var i = 0; i < student.attendance.length; i++) {
                    student.daysMissed += student.attendance[i];
                }
                studentData.push(student);
            });
            console.log("studentData = ", studentData);
            return studentData;
         },
         setAttendance: function(index, day, absent) {
            // student index, day of class counting from 0, absent = 1, present = 0
            this.students[index].attendance[day] = absent;
            console.log("studentData = " + this.students[index].attendance);
         }

    };
    var controller = {
        init: function() {
            view.init(model.getData());
        }
    };

    var view = {
        init: function(data) {
            this.tableHead = $('#table-head');
            // generate the table
            // data.length is the number of students. One more row for th
            // data[i].name goes in the first column
            // data[i].attendance.length is the number of days and checkbox columns to show
            // data[i].daysMissed has its own column at the end
            var htmlStr = '<table><thead><tr>';
            htmlStr += '<th class="name-col">Student Name</th>';
            data[0].attendance.forEach(function(absent, index){
                htmlStr += '<th>' + (index + 1) + '</th>';
            })
            htmlStr += '<th class="missed-col">Days Missed</th>';
            htmlStr += '</tr></thead></table>';
            this.tableHead.html(htmlStr);
            console.log("got here");
        }
    };

    // Add an eventlistener for whenever a student's daysMissed
    // Checkbox is checked. Update the Model, count numMissed days,
    // store, and update view

    // Generate the view for each student from the Model data


    // Count a student's missed days
    function countMissing() {
        $allMissed.each(function() {
            var studentRow = $(this).parent('tr'),
                dayChecks = $(studentRow).children('td').children('input'),
                numMissed = 0;

            dayChecks.each(function() {
                if (!$(this).prop('checked')) {
                    numMissed++;
                }
            });

            $(this).text(numMissed);
        });
    }

    // Check boxes, based on attendance records
    $.each(attendance, function(name, days) {
        var studentRow = $('tbody .name-col:contains("' + name + '")').parent('tr'),
            dayChecks = $(studentRow).children('.attend-col').children('input');

        dayChecks.each(function(i) {
            $(this).prop('checked', days[i]);
        });
    });

    // When a checkbox is clicked, update localStorage
    // $allCheckboxes.on('click', function() {
    //     var studentRows = $('tbody .student'),
    //         newAttendance = {};

    //     studentRows.each(function() {
    //         var name = $(this).children('.name-col').text(),
    //             $allCheckboxes = $(this).children('td').children('input');

    //         newAttendance[name] = [];

    //         $allCheckboxes.each(function() {
    //             newAttendance[name].push($(this).prop('checked'));
    //         });
    //     });

    //     countMissing();
    //     localStorage.attendance = JSON.stringify(newAttendance);
    // });
    model.getData();
    model.setAttendance(0, 2, 1);
    controller.init();
    // countMissing();
}());
