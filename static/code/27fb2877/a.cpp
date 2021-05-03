#include <iostream>
using namespace std;
using ll = long long;

ll c_floor(ll a, ll b) { return a / b; }
ll c_ceil(ll a, ll b) { return (a + b - 1) / b; }
ll u_floor(ll a, ll unit) {
  if (a >= 0) {
    return c_floor(a, unit) * unit;
  } else {
    return c_ceil(-a, unit) * -unit;
  }
}
ll u_ceil(ll a, ll unit) {
  if (a >= 0) {
    return c_ceil(a, unit) * unit;
  } else {
    return c_floor(-a, unit) * -unit;
  }
}

int main() {
  int unit = 3;

  for (int i = -10; i <= 10; i++) {
    cout << "floor: " << i << " => " << u_floor(i, unit) << endl;
  }

  for (int i = -10; i <= 10; i++) {
    cout << "ceil: " << i << " => " << u_ceil(i, unit) << endl;
  }
}