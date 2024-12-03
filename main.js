async function process_argv() {
    let { argv } = process;
    argv = argv.slice(2);
    const result = await studentActivitiesRegistration(argv);
    // const url = ' http://localhost:3001'

    return result;
}

async function getStudentActivities() {
    const ambilSiswa = await fetch('http://localhost:3001/activities');
    const dataActivities = await ambilSiswa.json();
    return dataActivities;
  }

  async function studentActivitiesRegistration(data) {
    const method = data[0]; 
    const arr = data.slice(1); 

    if (method === 'CREATE') {
        const name = arr[0];
        const day = arr[1];
        const hasil = await addStudent(name, day)
        return hasil
        

    } else if (method === 'DELETE') {
        const id = arr[0];
        const hasil = await deleteStudent(id)
        return hasil
    }
}

async function addStudent(name, day) {
    const response = await getStudentActivities();
    const finalActivities = response.filter(activity => activity.days.includes(day));
    const data = {
      name,
      activities: finalActivities.map(activity => ({ name: activity.name, desc: activity.desc })),
    };
    const addSiswa = await fetch('http://localhost:3001/students', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const hasil = await addSiswa.json();
    return hasil;
  }

  async function deleteStudent(id) {
    const deleteSiswa = await fetch(`http://localhost:3001/students/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }, 
    });
    const hasil = await deleteSiswa.json();
    return { message: `Successfully deleted student data with id ${id}` };
    
}

process_argv()
    .then((data) => {
        console.log(data);
    })
    .catch((err) => {
        console.log(err);
    });

module.exports = {
    studentActivitiesRegistration,
    getStudentActivities,
    addStudent,
    deleteStudent
};
