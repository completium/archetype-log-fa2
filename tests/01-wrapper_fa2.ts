import { Nat, Or } from '@completium/archetype-ts-types'
import { get_account, set_mockup, set_mockup_now, set_quiet } from '@completium/experiment-ts'

const assert = require('assert');

/* Contracts */

import { fa2_fungible, operator_param, operator_key } from './binding/fa2_fungible';
import { wrapper_fa2 } from './binding/wrapper_fa2';

/* Accounts ----------------------------------------------------------------- */

const owner         = get_account('alice');
const bridge_wallet = get_account('bob');
const user          = get_account('carl');
const other         = get_account('bootstrap1');
const user2 = get_account('bootstrap2');
const user3 = get_account('bootstrap3');
const user4 = get_account('bootstrap4');
const user5 = get_account('bootstrap5');

/* Endpoint ---------------------------------------------------------------- */

set_mockup()

/* Verbose mode ------------------------------------------------------------ */

set_quiet(true);

/* Now --------------------------------------------------------------------- */

const now = new Date(Date.now())
set_mockup_now(now)

/* Constants & Utils ------------------------------------------------------- */

const token_id = new Nat(0)
const amount   = new Nat(1000)
const amount_0 = new Nat(0)
const tag      = "my_tag"

/* Scenarios --------------------------------------------------------------- */

describe('[Wrapper FA2] Contracts deployment', async () => {
  it('FA2 fungible contract deployment should succeed', async () => {
    await fa2_fungible.deploy(owner.get_address(), { as: owner })
  });

  it('Wrapper FA2 contract deployment should succeed', async () => {
    await wrapper_fa2.deploy(owner.get_address(), fa2_fungible.get_address(), bridge_wallet.get_address(), { as: owner })
  });

});

describe('[Wrapper FA2] Setup', async () => {
  it('Mint for user', async () => {
    const balance_user_before = await fa2_fungible.get_ledger_value(user.get_address())
    assert(balance_user_before === undefined, "Invalid amount")

    await fa2_fungible.mint(user.get_address(), amount, { as: owner })

    const balance_user_after = await fa2_fungible.get_ledger_value(user.get_address())
    assert(balance_user_after?.equals(amount), "Invalid amount")
  });

  it('Log send memo', async () => {
    const balance_bridge_wallet_before = await fa2_fungible.get_ledger_value(bridge_wallet.get_address())
    assert(balance_bridge_wallet_before === undefined, "Invalid amount")

    const balance_user_before = await fa2_fungible.get_ledger_value(user.get_address())
    assert(balance_user_before?.equals(amount), "Invalid amount")

    const op_param = new operator_param(user.get_address(), wrapper_fa2.get_address(), token_id);
    await fa2_fungible.update_operators([Or.Left<operator_param, operator_param>(op_param)], {as: user});

    await wrapper_fa2.log_send_memo(amount, tag, {as: user});

    const balance_bridge_wallet_after = await fa2_fungible.get_ledger_value(bridge_wallet.get_address())
    assert(balance_bridge_wallet_after?.equals(amount), "Invalid amount")

    const balance_user_after = await fa2_fungible.get_ledger_value(user.get_address())
    assert(balance_user_after === undefined, "Invalid amount")
  })

});
