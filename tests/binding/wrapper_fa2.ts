import * as ex from "@completium/experiment-ts";
import * as att from "@completium/archetype-ts-types";
import * as el from "@completium/event-listener";
export class has_been_sent implements att.ArchetypeType {
    constructor(public sender: att.Address, public recipient: att.Address, public target: string, public amount: att.Nat, public contract_address: att.Address) { }
    toString(): string {
        return JSON.stringify(this, null, 2);
    }
    to_mich(): att.Micheline {
        return att.pair_to_mich([this.sender.to_mich(), att.pair_to_mich([this.recipient.to_mich(), att.pair_to_mich([att.string_to_mich(this.target), att.pair_to_mich([this.amount.to_mich(), this.contract_address.to_mich()])])])]);
    }
    equals(v: has_been_sent): boolean {
        return (this.sender.equals(v.sender) && this.sender.equals(v.sender) && this.recipient.equals(v.recipient) && this.target == v.target && this.amount.equals(v.amount) && this.contract_address.equals(v.contract_address));
    }
}
const declare_ownership_arg_to_mich = (candidate: att.Address): att.Micheline => {
    return candidate.to_mich();
}
const claim_ownership_arg_to_mich = (): att.Micheline => {
    return att.unit_mich;
}
const set_metadata_arg_to_mich = (k: string, d: att.Option<att.Bytes>): att.Micheline => {
    return att.pair_to_mich([
        att.string_to_mich(k),
        d.to_mich((x => { return x.to_mich(); }))
    ]);
}
const set_fa2_arg_to_mich = (v: att.Address): att.Micheline => {
    return v.to_mich();
}
const set_bridge_wallet_arg_to_mich = (v: att.Address): att.Micheline => {
    return v.to_mich();
}
const log_send_memo_arg_to_mich = (iamount: att.Nat, itarget: string): att.Micheline => {
    return att.pair_to_mich([
        iamount.to_mich(),
        att.string_to_mich(itarget)
    ]);
}
export class Wrapper_fa2 {
    address: string | undefined;
    constructor(address: string | undefined = undefined) {
        this.address = address;
    }
    get_address(): att.Address {
        if (undefined != this.address) {
            return new att.Address(this.address);
        }
        throw new Error("Contract not initialised");
    }
    async get_balance(): Promise<att.Tez> {
        if (null != this.address) {
            return await ex.get_balance(new att.Address(this.address));
        }
        throw new Error("Contract not initialised");
    }
    async deploy(owner: att.Address, fa2: att.Address, bridge_wallet: att.Address, params: Partial<ex.Parameters>) {
        const address = await ex.deploy("./contracts/wrapper_fa2.arl", {
            owner: owner.to_mich(),
            fa2: fa2.to_mich(),
            bridge_wallet: bridge_wallet.to_mich()
        }, params);
        this.address = address;
    }
    async declare_ownership(candidate: att.Address, params: Partial<ex.Parameters>): Promise<any> {
        if (this.address != undefined) {
            return await ex.call(this.address, "declare_ownership", declare_ownership_arg_to_mich(candidate), params);
        }
        throw new Error("Contract not initialised");
    }
    async claim_ownership(params: Partial<ex.Parameters>): Promise<any> {
        if (this.address != undefined) {
            return await ex.call(this.address, "claim_ownership", claim_ownership_arg_to_mich(), params);
        }
        throw new Error("Contract not initialised");
    }
    async set_metadata(k: string, d: att.Option<att.Bytes>, params: Partial<ex.Parameters>): Promise<any> {
        if (this.address != undefined) {
            return await ex.call(this.address, "set_metadata", set_metadata_arg_to_mich(k, d), params);
        }
        throw new Error("Contract not initialised");
    }
    async set_fa2(v: att.Address, params: Partial<ex.Parameters>): Promise<any> {
        if (this.address != undefined) {
            return await ex.call(this.address, "set_fa2", set_fa2_arg_to_mich(v), params);
        }
        throw new Error("Contract not initialised");
    }
    async set_bridge_wallet(v: att.Address, params: Partial<ex.Parameters>): Promise<any> {
        if (this.address != undefined) {
            return await ex.call(this.address, "set_bridge_wallet", set_bridge_wallet_arg_to_mich(v), params);
        }
        throw new Error("Contract not initialised");
    }
    async log_send_memo(iamount: att.Nat, itarget: string, params: Partial<ex.Parameters>): Promise<any> {
        if (this.address != undefined) {
            return await ex.call(this.address, "log_send_memo", log_send_memo_arg_to_mich(iamount, itarget), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_declare_ownership_param(candidate: att.Address, params: Partial<ex.Parameters>): Promise<att.CallParameter> {
        if (this.address != undefined) {
            return await ex.get_call_param(this.address, "declare_ownership", declare_ownership_arg_to_mich(candidate), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_claim_ownership_param(params: Partial<ex.Parameters>): Promise<att.CallParameter> {
        if (this.address != undefined) {
            return await ex.get_call_param(this.address, "claim_ownership", claim_ownership_arg_to_mich(), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_set_metadata_param(k: string, d: att.Option<att.Bytes>, params: Partial<ex.Parameters>): Promise<att.CallParameter> {
        if (this.address != undefined) {
            return await ex.get_call_param(this.address, "set_metadata", set_metadata_arg_to_mich(k, d), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_set_fa2_param(v: att.Address, params: Partial<ex.Parameters>): Promise<att.CallParameter> {
        if (this.address != undefined) {
            return await ex.get_call_param(this.address, "set_fa2", set_fa2_arg_to_mich(v), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_set_bridge_wallet_param(v: att.Address, params: Partial<ex.Parameters>): Promise<att.CallParameter> {
        if (this.address != undefined) {
            return await ex.get_call_param(this.address, "set_bridge_wallet", set_bridge_wallet_arg_to_mich(v), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_log_send_memo_param(iamount: att.Nat, itarget: string, params: Partial<ex.Parameters>): Promise<att.CallParameter> {
        if (this.address != undefined) {
            return await ex.get_call_param(this.address, "log_send_memo", log_send_memo_arg_to_mich(iamount, itarget), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_owner(): Promise<att.Address> {
        if (this.address != undefined) {
            const storage = await ex.get_storage(this.address);
            return new att.Address(storage.owner);
        }
        throw new Error("Contract not initialised");
    }
    async get_fa2(): Promise<att.Address> {
        if (this.address != undefined) {
            const storage = await ex.get_storage(this.address);
            return new att.Address(storage.fa2);
        }
        throw new Error("Contract not initialised");
    }
    async get_bridge_wallet(): Promise<att.Address> {
        if (this.address != undefined) {
            const storage = await ex.get_storage(this.address);
            return new att.Address(storage.bridge_wallet);
        }
        throw new Error("Contract not initialised");
    }
    async get_owner_candidate(): Promise<att.Option<att.Address>> {
        if (this.address != undefined) {
            const storage = await ex.get_storage(this.address);
            return new att.Option<att.Address>(storage.owner_candidate == null ? null : (x => { return new att.Address(x); })(storage.owner_candidate));
        }
        throw new Error("Contract not initialised");
    }
    async get_metadata_value(key: string): Promise<att.Bytes | undefined> {
        if (this.address != undefined) {
            const storage = await ex.get_storage(this.address);
            const data = await ex.get_big_map_value(BigInt(storage.metadata), att.string_to_mich(key), att.prim_annot_to_mich_type("string", []), att.prim_annot_to_mich_type("bytes", [])), collapsed = true;
            if (data != undefined) {
                return new att.Bytes(data);
            }
            else {
                return undefined;
            }
        }
        throw new Error("Contract not initialised");
    }
    async has_metadata_value(key: string): Promise<boolean> {
        if (this.address != undefined) {
            const storage = await ex.get_storage(this.address);
            const data = await ex.get_big_map_value(BigInt(storage.metadata), att.string_to_mich(key), att.prim_annot_to_mich_type("string", []), att.prim_annot_to_mich_type("bytes", [])), collapsed = true;
            if (data != undefined) {
                return true;
            }
            else {
                return false;
            }
        }
        throw new Error("Contract not initialised");
    }
    register_has_been_sent(ep: el.EventProcessor<has_been_sent>) {
        if (this.address != undefined) {
            el.registerEvent({ source: this.address, filter: tag => { return tag == "has_been_sent"; }, process: (raw: any, data: el.EventData | undefined) => {
                    const event = (x => {
                        return new has_been_sent((x => { return new att.Address(x); })(x.sender), (x => { return new att.Address(x); })(x.recipient), (x => { return x; })(x.target), (x => { return new att.Nat(x); })(x.amount), (x => { return new att.Address(x); })(x.contract_address));
                    })(raw);
                    ep(event, data);
                } });
            return;
        }
        throw new Error("Contract not initialised");
    }
    errors = {
        INVALID_CALLER: att.string_to_mich("\"INVALID_CALLER\""),
        ownership_r1: att.string_to_mich("\"INVALID_CALLER\"")
    };
}
export const wrapper_fa2 = new Wrapper_fa2();
