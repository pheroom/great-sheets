import {Page} from "@core/page/Page";
import {$} from "@core/dom";
import {createRecordsTable} from "@/shared/dashboard.functions";
import logo from '../logo.png'
import {StateProcessor} from "@core/page/StateProcessor";
import {LocalStorageClient, storageName} from "@/shared/LocalStorageClient";
import {Emitter} from "@core/Emmitter";
import {csvFileToObj} from "@/shared/csvFileToObj";
import {defaultState} from "@/redux/initialState";
import {ActiveRoute} from "@core/routes/ActiveRoute";

export class DashboardPage extends Page{
    constructor(param) {
        super(param);

        this.processor = new StateProcessor(
            new LocalStorageClient(this.params)
        )

        this.handleInputFile = (e) => {
            if(e.target.dataset.input === 'import-csv'){
                const id = Date.now()
                csvFileToObj(e.target.files[0]).then(data => {
                    this.processor.save({
                        ...defaultState,
                        title: e.target.files[0].name,
                        dataState: data
                    }, id).then(() => ActiveRoute.navigate('excel/' + id))

                })
            }
        }
    }

    async getRoot() {
        const now = Date.now().toString()


        document.addEventListener('input', this.handleInputFile)

        return $.create('div', 'db').html(`
            <div class="db__header">
                <img class="db__logo" src=${logo} alt="logo">
                <h1>Great Sheets</h1>
            </div>
            <div class="db__new">
                <div class="db__view db__new-inner">
                    <a href="#excel/${now}" class="db__create">
                        new <br/> table
                    </a>
                    <label class="db__input-file">
                        <input data-input="import-csv" type="file" name="csv" accept=".csv">
                        <span>Загрузить файл</span>
                    </label>
                </div>
            </div>
            <div class="db__table db__view">
                ${createRecordsTable(await this.processor.getAll())}
            </div>
        `)
    }

    destroy(){
        document.removeEventListener('input', this.handleInputFile)
    }
}