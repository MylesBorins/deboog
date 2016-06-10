var count = 0;

(function timeout() {
  setTimeout(_ => {
    count += 1000;
    timeout();
  }, 1000);
}())
