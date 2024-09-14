const app = Vue.createApp({

    data() {
        return {
            books: [],
            categories: [],
            bookcat: [],
            categoriesToAdd: [],
            categoriesToEdit: [],
            tempCategory: '',
            booksTab: true,
            addBookTab: false,
            searchTab: false,
            current: 'byCategory',
            newTitle: '',
            newAuthor: '',
            newPrice: null,
            newCategory: null,
            search: '',
            editPage: false,
            editingTitle: '',
            editingAuthor: '',
            editingPrice: null,
            editingCategory: null
        }
    },

    mounted() {
        fetch('../books.json')
        .then(res => res.json())
        .then(data => this.books = data)

        fetch('../category.json')
        .then(res1 => res1.json())
        .then(data => this.categories = data)

        fetch('../book-cat.json')
        .then(res3 => res3.json())
        .then(data => this.bookcat = data)
    },

    methods: {
        addCategory(e){
            if(!this.categoriesToAdd.includes(this.tempCategory)){
                this.categoriesToAdd.push(this.tempCategory)
            }
            this.tempCategory = ''
        },
        addEditCategory(e){
            if(!this.categoriesToEdit.includes(this.tempCategory)){
                this.categoriesToEdit.push(this.tempCategory)
            }
            this.tempCategory = ''
        },
        deletecate(cate){
            this.categoriesToAdd = this.categoriesToAdd.filter((item) => {
                return cate !== item
            })
        },
        goAddBook(){
            this.newTitle = ''
            this.newAuthor = ''
            this.newPrice = null
            this.categoriesToAdd = []
            this.addBookTab = true
            this.booksTab = false
            this.searchTab = false
        },
        goBooksTab(){
            this.booksTab = true
            this.addBookTab = false
            this.searchTab = false
        },
        goSearchTab(){
            this.searchTab = true
            this.addBookTab = false
            this.booksTab = false
        },
        updateFilter(by){
            this.current = by
        },
        handleAdd(){
            Swal.fire({
                title: "Are you sure?",
                text: "You want to Add This Book!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, Apply Adding!"
              }).then((result) => {
                if (result.isConfirmed) {
                    let Book = {
                        title: this.newTitle,
                        author: this.newAuthor,
                        price: this.newPrice,
                        catid: this.categoriesToAdd
                    }
                    for(let i in this.categoriesToAdd.length){
                        fetch('../books.json', {
                            method: 'POST',
                            headers: {'Content-Type': 'application/json'},
                            body: JSON.stringify(Book)
                        })
                    }
                    console.log(Book)
                    this.booksTab = true
                    this.addBookTab = false
                    this.searchTab = false
                  Swal.fire({
                    title: "Successful!",
                    text: "Your Book has been Added.",
                    icon: "success"
                  });
                }
            });
        },
        cancelAdd(){
            Swal.fire({
                title: "Are you sure?",
                text: "You will Cancel Adding This Book!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, Cancel it!"
              }).then((result) => {
                if (result.isConfirmed) {
                    this.booksTab = true
                    this.addBookTab = false
                    this.searchTab = false
                    this.categoriesToEdit = []
                  Swal.fire({
                    title: "Canceled!",
                    text: "Your Book Adding Canceled.",
                    icon: "success"
                  });
                }
            });
        },
        deleteBook(id){
            Swal.fire({
                title: "Are you sure?",
                text: "You want to Delete this Book!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
              }).then((result) => {
                if (result.isConfirmed) {
                    this.books = this.books.filter((book) => {
                        return book.id !== id;
                    })
                    fetch('../books.json/' + --id, {
                        method: 'DELETE'
                    })
                        .catch(err => console.log(err.message))
                  Swal.fire({
                    title: "Deleted!",
                    text: "Your Book has been deleted.",
                    icon: "success"
                  });
                }
            });
        },

        goEdit(id){
            this.categoriesToEdit = []
            this.editingTitle = this.books[id-1].title
            this.editingAuthor = this.books[id-1].author
            this.editingPrice = this.books[id-1].pages
            for(let i in this.bookcat){

                // this.bookcat[i].catId === this.categories[(this.books[id-1].catid)-1].id &&

                if(this.bookcat[i].bookId === this.books[id-1].id){
                    // console.log(this.bookcat[i].catId)
                    this.categoriesToEdit.push(this.categories[(this.bookcat[i].catId)-1].name)
                }
            }
            
            // this.categoriesToEdit = this.categories[(this.books[id-1].catid)-1].name
            this.editPage = true
        },
        deletecateit(cate){
            this.categoriesToEdit = this.categoriesToEdit.filter((item) => {
                return cate !== item
            })
        },
        handleEdit(){
            Swal.fire({
                title: "Are you sure?",
                text: "You want to Edit This Book!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, Apply Edits!"
              }).then((result) => {
                if (result.isConfirmed) {
                    let Book = {
                        title: this.editingTitle,
                        author: this.editingAuthor,
                        price: this.editingPrice,
                        catid: this.categoriesToEdit
                    }
                    for(let i in this.categoriesToEdit.length){
                        fetch('../books.json', {
                            method: 'PATCH',
                            headers: {'Content-Type': 'application/json'},
                            body: JSON.stringify(Book)
                        })
                    }
                    console.log(Book)
                    this.editPage = false
                    this.categoriesToEdit = 
                  Swal.fire({
                    title: "Successful!",
                    text: "Your Book has been Added.",
                    icon: "success"
                  });
                }
            });
        },
        cancelEdit(){
            Swal.fire({
                title: "Are you sure?",
                text: "You will Cancel Editind This Book!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, Cancel it!"
              }).then((result) => {
                if (result.isConfirmed) {
                    this.editPage = false
                  Swal.fire({
                    title: "Canceled!",
                    text: "Your Book Editing Canceled.",
                    icon: "success"
                  });
                }
            });
        }
        
    },

    computed: {
        findBook(){
            return this.books.filter((book) => {
                if(book.title.toLowerCase().includes(this.search.toLowerCase()) || book.author.toLowerCase().includes(this.search.toLowerCase()))
                return book
            },)
        }
    }
})

app.mount('#app')