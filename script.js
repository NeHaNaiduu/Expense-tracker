const expList=[];

            function addExpense(){
                const expName=document.getElementById('expenseName');
                const name =expName.value;
                const expCat=document.getElementById('expenseCategory');
                const Category=expCat.value;
                const expAmount=document.getElementById('expenseAmount');
                const Amount=parseFloat(expAmount.value);
                
                expList.push({
                    expensename:name,
                    expensecategory:Category,
                    expenseamount:Amount
                });

                expName.value='';
                expCat.value='';
                expAmount.value='';

                updateSummary();
                delExpense();

            }

            function delExpense(){
                let ListHtml='';
                for(let i=0; i<expList.length; i++){
                    const todoObj=expList[i];
                    const name=todoObj.expensename;
                    const category=todoObj.expensecategory;
                    const amount=todoObj.expenseamount;
                    const html=`
                        <div>${name}</div> 
                        <div>${category}</div> 
                        <div>$${amount.toFixed(2)}</div>
                        <button onclick="deleteExpense(${i})
                        " class="js-delete">Delete</button>
                        `;
                    ListHtml+=html;
                }

                document.querySelector('.js-expenseList').innerHTML=ListHtml;
            }

            function updateSummary() {
                const total = expList.reduce((acc, expense) => acc + expense.expenseamount, 0);
                const average = expList.length>0 ? total/expList.length : 0;
                const mostExpensive = expList.reduce((max, expense) => expense.expenseamount > max.expenseamount ? expense : max, { expenseamount: -Infinity });

                totalExpenses.textContent = total.toFixed(2);
                averageExpense.textContent = average.toFixed(2);
                expensiveItem.textContent = mostExpensive.expensename || 'N/A';
            }

            function deleteExpense(index){
                expList.splice(index,1);
                delExpense();
                updateSummary();
            }