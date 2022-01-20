import { EmissionModule, EmissionUtils, ModuleType } from "../../emission-module";
import { ElectricityTypeFactory } from "./electricity_types";

export const ELECTRICITY_EMISSION_MODULE_ID = "electricity_emission_module";

export class ElectricityEmissionModule implements EmissionModule{
    public id: string = ELECTRICITY_EMISSION_MODULE_ID;
    public data: Map<ModuleType, number> = new Map();

    addElectricityType(electricityType: string, number: number = 0){
        try{
            this.data.set(ElectricityTypeFactory.create(electricityType), number);
        }catch(ex){
            console.log(ex)
        }
    }

    calculate(): number {
        let ret: number = 0;
        for( const [ type, number ] of this.data){
            ret += type.factor * number;
        }
        return ret;
    }
    getIDs():string[]{
        let ret:string[] = [];
        this.data.forEach((l, electricityType) => {
            ret.push(electricityType.id);
        })
        return ret;
    }
}

export class ElectricityEmissionUtils implements EmissionUtils{
    create(data: any): EmissionModule {
        let module = new ElectricityEmissionModule();
        if(data.data != null){
            for(const [ typeId, number ] of data.data){
                module.addElectricityType(typeId, number);
            }
        }
        return module;
    }
    save(module: EmissionModule): Object | undefined {
        if(module instanceof ElectricityEmissionModule){
            let toner: ElectricityEmissionModule = module as ElectricityEmissionModule;

            let dataMap: Array<any> = new Array();
            for(const [ type, number ] of module.data){
                dataMap.push( [ type.id, number ] );
            }

            return { type: toner.id, data: dataMap };
        }
        return undefined;
    }
}